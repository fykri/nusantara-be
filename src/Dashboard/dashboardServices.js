const {hitungBarangMasuk, hitungBarangKeluar, hitungBrgTerkirim} = require('./dashboardRepository')

const hitungJmlRecBarangMasuk = async()=> {
    try {
        const barangMasuk = await hitungBarangMasuk();
        return {
            status: 200,
            msg: 'berhasil',
            data: {
                barangMasuk
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const hitungJmlRecBarangKeluar = async()=> {
    try {
        const barangKeluar = await hitungBarangKeluar();
        return {
            status: 200,
            msg: 'berhasil',
            data: {
                barangKeluar
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const hitungJmlRecBarangTerkirim = async()=> {
    try {
        const barangTerkirim = await hitungBrgTerkirim();
        return {
            status: 200,
            msg: 'berhasil',
            data: {
                barangTerkirim
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    hitungJmlRecBarangMasuk,
    hitungJmlRecBarangKeluar,
    hitungJmlRecBarangTerkirim
}