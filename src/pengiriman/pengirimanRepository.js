const prisma = require('../../prisma/prismaClient')
const moment = require('moment')

const findByIdPengiriman = async(id_pengiriman)=> {
    try {
        return await prisma.pengiriman.findUnique({
            where:{
                id_pengiriman
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

const dataListPengiriman = async()=> {
    return await prisma.pengiriman.findMany({
        where: {status: 'Dalam Pengiriman'},
        select: {
            tanggal_pengiriman:true,
            id_pengiriman: true,
            status: true,
            barang_keluar: {
                select: {
                    kuantitas: true,
                    barang: {
                        select: {
                            nama_barang: true
                        }
                    },
                    pelanggan: {
                        select: {
                            nama_pelanggan:true
                        }
                    },
                }
            }
        }
    })
}

const dataListRiwayat = async()=> {
    return await prisma.pengiriman.findMany({
        where: {status: 'Terkirim'},
        select: {
            tanggal_pengiriman:true,
            id_pengiriman: true,
            status: true,
            barang_keluar: {
                select: {
                    kuantitas: true,
                    barang: {
                        select: {
                            nama_barang: true
                        }
                    },
                    pelanggan: {
                        select: {
                            nama_pelanggan:true
                        }
                    }
                }
            }
        }
    })
}

const updateList = async(id_pengiriman) => {
    return await prisma.pengiriman.update({
        where: {id_pengiriman},
        data: {
            status: 'Terkirim',
            tanggal_pengiriman: moment()
        }
    })
}

const detail = async (id_pengiriman)=> {
    return await prisma.pengiriman.findFirst({
        where:{id_pengiriman}, 
        select: {
            id_pengiriman: true,
            tanggal_pengiriman: true,
            status: true,
            barang_keluar: {
                select: {
                    id_barang_keluar: true,
                    kuantitas: true,
                    barang: true,
                    pelanggan: true
                }
            }
        }
    })
}

module.exports = {
    dataListPengiriman,
    updateList,
    dataListRiwayat,
    findByIdPengiriman,
    detail
}