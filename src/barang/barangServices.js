const {
    insertData,
    getALl,
    update,
    findById,
    remove,
    findByname
} = require("./barangRepository");

const tampilBarang = async () => {
    try {
        const barang = await getALl();
        if (barang.length === 0) {
            return { status: 404, msg: "Oops, tabel ini masih kosong! Mulailah dengan menambahkan data baru" };
        }
        return {
            status: 200,
            barang,
            msg: "barang ada",
        };
    } catch (err) {
        console.log("terjadi kesalahan", err);
    }
};

const tambahBarang = async (nama_barang, kategori, harga, stok) => { 
    if (!nama_barang || !kategori || !harga || !stok) {
        return {
            status: 404,
            msg: "Sumber daya tidak ditemukan: Semua input harus diisi",
        };
    }

    if (isNaN(harga)) {
        return {
            status: 400,
            msg: "harga_per_satuan harus berupa angka",
        };
    }

    if (isNaN(stok)) {
        return {
            status: 400,
            msg: "stok harus berupa angka",
        }
    }

    if(await findByname(nama_barang)) {
        return {
            status:409,
            msg: `Konflik: Nama barang ${nama_barang} sudah terdaftar dalam tabel`
        }
    }

    try {
        await insertData(nama_barang, kategori,harga, stok);
        return {
            status: 200,
            msg: `barang dengan nama ${nama_barang} berhasil ditambahkan`,
        };
    } catch (err) {
        console.log(err.message);
    }
};

const perbaruiBarang = async (id_barang, nama_barang, kategori, harga, stok) => {
    if (!(await findById(id_barang))) {
        return {
            status: 404,
            msg: `barang ${nama_barang} tidak ditemukan`,
        };
    }
    if (!id_barang || !nama_barang || !kategori || !harga || !stok) {
        return {
            status: 404,
            msg: "Sumber daya tidak ditemukan: Semua input harus diisi",
        };
    }

    if (isNaN(harga)) {
        return {
            status: 400,
            msg: "harga_per_satuan harus berupa angka",
        };
    }

    if (isNaN(stok)) {
        return {
            status: 400,
            msg: "stok harus berupa angka",
        }
    }
    const barangId = await findById(id_barang)
    const barangName = await findByname(nama_barang)
        if(barangName) {
            if(barangId.nama_barang !==  barangName.nama_barang) {
                return {
                    status: 409,
                    msg: `Konflik: Nama barang ${nama_barang} sudah terdaftar dalam tabel`
                }
            }
        }

    try {
        await update(id_barang, nama_barang, kategori, harga, stok);
        return {
            status: 200,
            msg: `barang berhasil di update`,
        };
    } catch (err) {
        console.log("error update", err.message);
    }
};

const hapusBarang = async (id_barang) => {
    if (!(await findById(id_barang))) {
        return {
            status: 404,
            msg: "barang tidak ditemukan",
        };
    }
    const barang = await remove(id_barang);
    return {
        status: 200,
        msg: `barang ${barang.nama_barang} berhasil dihapus`,
    };
};

module.exports = {
    tambahBarang,
    tampilBarang,
    perbaruiBarang,
    hapusBarang,
};
