const {getAll, findByIdBarangKeluar, insertData, update, getByfirstIdBarang, remove} = require('./barangKlrRepository')
const {findByIdBarang} = require('../barang/barangRepository')
const {findByIdPelanggan} = require('../pelanggan/pelangganRepository')


const tampilBarangKeluar = async()=>{
    try {
        const barangKlr = await getAll();
        if (barangKlr.length === 0) {
            return { status: 404, msg: "Oops, tabel ini masih kosong! Mulailah dengan menambahkan data baru" };
        }
        return {
            status: 200,
            barangKlr,
            msg: "barang ada",
        };
    } catch (err) {
        console.log("terjadi kesalahan", err);
    }
}

const tambahBarangKeluar= async(id_barang, id_pelanggan, kuantitas, tanggal_keluar)=> {
    if(!await findByIdBarang(id_barang)) {
        return {
            status: 404,
            msg: 'id Barang Wrong'
        }
    }

    if(!await findByIdPelanggan(id_pelanggan)) {
        return {
            status: 404,
            msg: 'id Pelanggan Wrong'
        }
    }
    if (!id_barang || !id_pelanggan || !kuantitas || !tanggal_keluar) {
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

    const barang = await findByIdBarang(id_barang)
    if(parseInt(kuantitas) > barang.stok) {
        return {
            status: 400,
            msg: "Warning: tidak bisa mengeluarkan barang dikarenakan stok yang ada dibarang lebih kecil dari jumlah yang diupdate"
        }
    }
    
    try {
        await insertData(id_barang, id_pelanggan, kuantitas, tanggal_keluar)
        return {
            status:200,
            msg: `barang ${barang.nama_barang} berhasil ditambahkan`
        }
    } catch (error) {
        console.log(error.message);
    }

}

const updateBarangKeluar = async(id_barang_keluar ,id_barang, id_pelanggan, kuantitas, tanggal_keluar)=> {
    if (!(await findByIdBarangKeluar(id_barang_keluar))) {
        return {
            status: 404,
            msg: "barang Keluar tidak ditemukan",
        };
    }

    if(!await findByIdBarang(id_barang)) {
        return {
            status: 404,
            msg: `barang tidak ditemukan`
        }
    }

    if(!await findByIdPelanggan(id_pelanggan)) {
        return {
            status: 404,
            msg: `pelanggan tidak ditemukan`
        }
    }

    if (!id_barang || !id_pelanggan || !kuantitas || !tanggal_keluar) {
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
        const barang = await findByIdBarang(id_barang)
        const barang_keluar = await getByfirstIdBarang(id_barang)
        const stokBarang = barang.stok + barang_keluar.kuantitas
        if(parseInt(kuantitas) > stokBarang) {
            return {
                status: 400,
                msg: "Warning: tidak dapat update barang dikarenakan stok yang ada dibarang lebih kecil dari jumlah yang dikeluarkan"
            }
        }
        await update(id_barang_keluar, id_barang, id_pelanggan, kuantitas, tanggal_keluar);
        return {
            status: 200,
            msg: `barang berhasil di update`,
        };
    } catch (err) {
        console.log("error update", err.message);
    }
}

const hapusBarangKeluar = async(id_barang_keluar)=> {
    if (!(await findByIdBarangKeluar(id_barang_keluar))) {
        return {
            status: 404,
            msg: `barang tidak ditemukan`,
        };
    }
    await remove(id_barang_keluar);
    return {
        status: 200,
        msg: `barang berhasil dihapus`,
    };
}

module.exports = {
    tampilBarangKeluar,
    tambahBarangKeluar,
    updateBarangKeluar,
    hapusBarangKeluar
}
