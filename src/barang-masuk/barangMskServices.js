const {getALl, insertData, getById, update, remove} = require('./barangMskRepository')
const {findById} = require('../barang/barangRepository')

const tampilBarangMasuk = async()=>{
    try {
        const barangMsk = await getALl();
        if (barangMsk.length === 0) {
            return { status: 404, msg: "Oops, tabel ini masih kosong! Mulailah dengan menambahkan data baru" };
        }
        return {
            status: 200,
            barangMsk,
            msg: "barang ada",
        };
    } catch (err) {
        console.log("terjadi kesalahan", err);
    }
}

const tambahBarangMasuk= async(id_barang, tanggal_masuk, kuantitas)=> {
    if(!await findById(id_barang)) {
        return {
            status: 404,
            msg: 'id Barang Wrong'
        }
    }
    if (!id_barang || !tanggal_masuk || !kuantitas) {
        return {
            status: 404,
            msg: "Sumber daya tidak ditemukan: Semua input harus diisi",
        };
    }

    if (isNaN(kuantitas)) {
        return {
             status: 400,
             msg: "kuantitas harus berupa angka",
        };
    }
    try {
        await insertData(id_barang, tanggal_masuk, kuantitas)
        const barang = await findById(id_barang)
        return {
            status:200,
            msg: `barang ${barang.nama_barang} berhasil masuk`
        }
    } catch (error) {
        console.log(error.message);
    }
   

}

const perbaruiBarangMasuk = async (id_barang_masuk, id_barang, tanggal_masuk, kuantitas) => {
    if (!(await getById(id_barang_masuk))) {
        return {
        status: 404,
        msg: "barang tidak ditemukan",
        };
    }

    if(!await findById(id_barang)) {
        return {
            status: 404,
            msg: `id ${id_barang} Wrong`
        }
    }

    if (!id_barang || !tanggal_masuk || !kuantitas) {
        return {
            status: 404,
            msg: "inputan tidak boleh kosong",
        };
    }
  
    if (isNaN(kuantitas)) {
        return {
            status: 400,
            msg: "kuantitas harus berupa angka",
        };
    }
  
    try {
        await update(id_barang_masuk,id_barang, tanggal_masuk, kuantitas);
        const barang = await findById(id_barang)
        return {
            status: 200,
            msg: `barang ${barang.nama_barang} berhasil di update`,
        };
    } catch (err) {
        console.log("error update", err.message);
    }
};

const hapusBarangMasuk = async (id_barang_masuk) => {
    const barang_masuk = await getById(id_barang_masuk)
    if (!(await getById(id_barang_masuk))) {
        return {
            status: 404,
            msg: `barang tidak ditemukan`,
        };
    }
    await remove(id_barang_masuk);
    return {
        status: 200,
        msg: `barang ${barang_masuk.barang.nama_barang} berhasil dihapus`,
    };
};

const cariBarangMasukDenganId = async (id_barang_masuk) => {
    try {
        const barang = await getById(id_barang_masuk);
        if (!barang) {
            return {
                status: 404,
                msg: "barang tidak ditemukan",
            };
        }
        return {
            status: 200,
            msg: `barang ditemukan`,
            barang,
        };
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    tambahBarangMasuk,
    tampilBarangMasuk,
    perbaruiBarangMasuk,
    hapusBarangMasuk,
    cariBarangMasukDenganId,
}