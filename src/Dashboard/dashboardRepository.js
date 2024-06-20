const prisma = require('../../prisma/prismaClient')

const hitungBarangMasuk = async()=> {
    return await prisma.barang_masuk.aggregate({
        _sum: {
            kuantitas: true
        }
    })
}

const hitungBarang = async()=> {
    return await prisma.barang.aggregate({
        _sum: {
            stok: true
        }
    })
}

const hitungBarangKeluar = async()=> {
    return await prisma.barang_keluar.aggregate({
        _sum:{kuantitas: true}
    })
}

const hitungBrgTerkirim = async()=> {
    const result = await prisma.pengiriman.findMany({
        where: {status: 'Terkirim'},
        select: {
            barang_keluar: {
                select: {
                    kuantitas: true
                }
            }
        }
    })

    return result.reduce((acc, pengiriman)=> {
        return acc + (pengiriman.barang_keluar?.kuantitas || 0)
    }, 0)
}
module.exports = {
    hitungBarangMasuk,
    hitungBarangKeluar,
    hitungBrgTerkirim,
    hitungBarang
}