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

const cariBarangDenganId = async (id_barang) => {
  try {
    const barang = await findById(id_barang);
    if (!barang) {
      return {
        status: 404,
        msg: `barang tidak ditemukan`,
      };
    }
    return {
      status: 200,
      msg: `barang ${barang.nama_barang} ditemukan`,
      barang,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const tambahBarang = async (nama_barang, kategori, harga, stok) => { 
  if (!nama_barang || !kategori || !harga || !stok) {
    return {
      status: 404,
      msg: "Sumber daya tidak ditemukan: Semua input harus diisi",
    };
  }

  if(await findByname(nama_barang)) {
    return {
        status:409,
        msg: `Konflik: Nama barang ${nama_barang} sudah terdaftar dalam tabel`
    }
}

  if (isNaN(harga)) {
    return {
      status: 400,
      msg: "harga_per_satuan harus berupa angka",
    };
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
    const barang = await findById(id_barang)
    if(barang.nama_barang !== nama_barang) {
        return {
            status:409,
            msg: `Konflik: Nama barang ${nama_barang} sudah terdaftar dalam tabel`
        }
    }

    if (isNaN(harga) || isNaN(stok)) {
        return {
        status: 400,
        msg: "harga atau stok harus berupa angka",
        };
    }

    try {
        await update(id_barang, nama_barang, kategori, harga, stok);
        return {
        status: 200,
        msg: `barang ${nama_barang} berhasil di update`,
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
  cariBarangDenganId,
  hapusBarang,
};
