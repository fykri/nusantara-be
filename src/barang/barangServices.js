const {
  insertData,
  getALl,
  update,
  findById,
  remove,
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
        msg: "barang tidak ditemukan",
      };
    }
    return {
      status: 200,
      msg: "barang ditemukan",
      barang,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const tambahBarang = async (nama_barang, kategori, harga) => {
  if (!nama_barang || !kategori || !harga) {
    return {
      status: 404,
      msg: "tambah barang gagal",
    };
  }

  if (isNaN(harga)) {
    return {
      status: 400,
      msg: "harga_per_satuan harus berupa angka",
    };
  }

  try {
    const hargaParsed = parseFloat(harga);
    await insertData(nama_barang, kategori, hargaParsed);
    return {
      status: 200,
      msg: "tambah barang berhasil",
    };
  } catch (err) {
    console.log(err.message);
  }
};

const perbaruiBarang = async (id_barang, nama_barang, kategori, harga) => {
  if (!(await findById(id_barang))) {
    return {
      status: 404,
      msg: "barang tidak ditemukan",
    };
  }
  if (!id_barang || !nama_barang || !kategori || !harga) {
    return {
      status: 404,
      msg: "inputan tidak boleh kosong",
    };
  }

  if (isNaN(harga)) {
    return {
      status: 400,
      msg: "harga_per_satuan harus berupa angka",
    };
  }

  try {
    const hargaParsed = parseFloat(harga);
    await update(id_barang, nama_barang, kategori, hargaParsed);
    return {
      status: 200,
      msg: "barang berhasil di update",
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
  await remove(id_barang);
  return {
    status: 200,
    msg: "barang berhasil dihapus",
  };
};

module.exports = {
  tambahBarang,
  tampilBarang,
  perbaruiBarang,
  cariBarangDenganId,
  hapusBarang,
};
