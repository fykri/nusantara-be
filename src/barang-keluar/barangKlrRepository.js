const prisma = require('../../prisma/prismaClient')
const moment = require('moment')
const {findByIdBarang} = require('../barang/barangRepository')


const getAll = async ()=> {
    return await prisma.barang_keluar.findMany({
        orderBy: {
            createdAt: 'asc'
        }
    });
}

const insertData = async (id_barang, id_pelanggan, kuantitas, tanggal_keluar) => {
    const id_barang_keluar = `BKL-${Math.floor(Math.random() * 99999999).toString().padStart(8, '0')}`;
    const barang = await findByIdBarang(id_barang)
    return await prisma.barang_keluar.create({
        data: {
            id_barang_keluar,
            id_barang,
            id_pelanggan,
            kuantitas: parseInt(kuantitas),
            tanggal_keluar: moment(tanggal_keluar),
            total_harga: parseInt(kuantitas) * barang.harga
        }
    })
}

const findByIdBarangKeluar = async(id_barang_keluar)=> {
    return await prisma.barang_keluar.findUnique({
        where: {id_barang_keluar}
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


module.exports = {
    getAll,
    insertData,
    findByIdBarangKeluar,
    update
}