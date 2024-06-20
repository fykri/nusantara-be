const prisma = require('../../prisma/prismaClient')

const hitungBarangMasuk = async()=> {
    return await prisma.barang_masuk.count()
}

const hitungBarangKeluar = async()=> {
    return await prisma.barang_keluar.count()
}

const hitungBrgTerkirim = async()=> {
    return await prisma.pengiriman.count({
        where: {status: 'Terkirim'}
    })
}
module.exports = {
    hitungBarangMasuk,
    hitungBarangKeluar,
    hitungBrgTerkirim
}