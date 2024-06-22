const prisma = require('../../prisma/prismaClient')
const moment = require('moment')
const {findByIdBarang} = require('../barang/barangRepository')


const getAll = async ()=> {
    return await prisma.barang_keluar.findMany({
        where:{terkirim: false},
        orderBy: {
            createdAt: 'asc'
        }
    });
}

const insertData = async (id_barang, id_pelanggan, kuantitas, tanggal_keluar) => {
    const id_barang_keluar = `BKL-${Math.floor(Math.random() * 99999999).toString().padStart(8, '0')}`;
    const barang = await findByIdBarang(id_barang)
    const barang_keluar =  await prisma.barang_keluar.create({
        data: {
            id_barang_keluar,
            id_barang,
            id_pelanggan,
            kuantitas: parseInt(kuantitas),
            tanggal_keluar: moment(tanggal_keluar),
            total_harga: parseInt(kuantitas) * barang.harga
        }
    })
    if(barang_keluar) {
        const id_pengiriman = `DV-${Math.floor(Math.random() * 99999999).toString().padStart(4, '0')}`;
        await prisma.pengiriman.create({
            data: {
                id_pengiriman,
                id_barang_keluar,
                status: 'Pengemasan'
            }
        })
    }
    return barang_keluar
}

const findByIdBarangKeluar = async(id_barang_keluar)=> {
    return await prisma.barang_keluar.findUnique({
        where: {id_barang_keluar},
            select: {
                id_barang_keluar: true,
                id_barang: true,
                id_pelanggan: true,
                kuantitas: true,
                terkirim: true,
                pelanggan: {
                    select: {
                        id_pelanggan: true,
                        nama_pelanggan: true,
                        alamat: true,
                        no_telpon: true,
                    }
                },
                Pengiriman: {
                    select: {
                        id_pengiriman:true,
                        tanggal_pengiriman: true
                    }
                }
            }
    })
}

const update = async(id_barang_keluar, id_barang, id_pelanggan ,kuantitas, tanggal_keluar)=> {
    return await prisma.barang_keluar.update({
        where: {id_barang_keluar},
        data: {
            id_barang_keluar,
            id_barang,
            id_pelanggan,
            kuantitas: parseInt(kuantitas),
            tanggal_keluar: moment(tanggal_keluar)
        }
    })
}

const getByfirstIdBarang = async(id_barang)=> {
    return await prisma.barang_keluar.findFirst({
        where:{id_barang}
    })
}

const remove = async(id_barang_keluar) => {
    return await prisma.barang_keluar.delete({
        where:{id_barang_keluar}
    })
}

const updateStatus = async (id_barang_keluar)=> {
    return await prisma.pengiriman.update({
        where: {
            id_barang_keluar
        },
        data: {
            tanggal_pengiriman: moment(),
            status: 'Dalam Pengiriman',
            barang_keluar: {
                update: {
                    data: {
                        terkirim: true
                    }
                }
            }
        }
    })
}

module.exports = {
    getAll,
    insertData,
    findByIdBarangKeluar,
    update,
    getByfirstIdBarang,
    remove,
    updateStatus
}