const {hitungBarangMasuk, hitungBarangKeluar, hitungBrgTerkirim, hitungBarang} = require('./dashboardRepository')

const hitungStokBarangMasuk = async()=> {
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

const hitungStokBarang = async()=> {
    try {
        const barang = await hitungBarang();
        return {
            status: 200,
            msg: 'berhasil',
            data: {
                barang
            }
        }
    } catch (error) {
        console.log(error);
    }
}


const hitungStokBarangKeluar = async()=> {
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

const hitungStokBarangTerkirim = async()=> {
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
    hitungStokBarangMasuk,
    hitungStokBarangKeluar,
    hitungStokBarangTerkirim,
    hitungStokBarang
}