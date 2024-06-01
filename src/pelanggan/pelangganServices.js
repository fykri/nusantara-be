const {
  insertData,
  getALl,
  update,
  findById,
  remove,
  findByname
} = require("./pelangganRepository");

const tampilPelanggan = async () => {
  try {
    const pelanggan = await getALl();
    if (pelanggan.length === 0) {
      return { status: 404, msg: "Oops, tabel ini masih kosong! Mulailah dengan menambahkan data baru" };
    }
    return {
      status: 200,
      pelanggan,
      msg: "pelanggan ada",
    };
  } catch (err) {
    console.log("terjadi kesalahan", err);
  }
};

const cariPelangganDenganId = async (id_pelanggan) => {
  try {
    const pelanggan = await findById(id_pelanggan);
    if (!pelanggan) {
      return {
        status: 404,
        msg: `pelanggan tidak ditemukan`,
      };
    }
    return {
      status: 200,
      msg: `pelanggan ${pelanggan.nama_pelanggan} ditemukan`,
      pelanggan,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const tambahPelanggan = async (nama_pelanggan, alamat, email, no_telepon) => { 
  if (!nama_pelanggan || !alamat || !email || !no_telepon) {
    return {
      status: 404,
      msg: "Sumber daya tidak ditemukan: Semua input harus diisi",
    };
  }

  if(await findByname(nama_pelanggan)) {
    return {
        status:409,
        msg: `Konflik: Nama pelanggan ${nama_pelanggan} sudah terdaftar dalam tabel`
    }
}

  // if (isNaN(harga)) {
  //   return {
  //     status: 400,
  //     msg: "harga_per_satuan harus berupa angka",
  //   };
  // }

  try {
    await insertData(nama_pelanggan, alamat, email, no_telepon);
        return {
            status: 200,
            msg: `pelanggan dengan nama ${nama_pelanggan} berhasil ditambahkan`,
        };
  } catch (err) {
    console.log(err.message);
  }
};

const perbaruiPelanggan = async (id_pelanggan, nama_pelanggan, alamat, email, no_telepon) => {
    if (!(await findById(id_pelanggan))) {
        return {
            status: 404,
            msg: `pelanggan ${nama_pelanggan} tidak ditemukan`,
        };
    }
    if (!id_pelanggan || !nama_pelanggan || !alamat || !email || !no_telepon) {
        return {
            status: 404,
            msg: "Sumber daya tidak ditemukan: Semua input harus diisi",
        };
    }
    const pelanggan = await findById(id_pelanggan)
    if(pelanggan.nama_pelanggan !== nama_pelanggan) {
        return {
            status:409,
            msg: `Konflik: Nama pelanggan ${nama_pelanggan} sudah terdaftar dalam tabel`
        }
    }

    // if (isNaN(harga) || isNaN(stok)) {
    //     return {
    //     status: 400,
    //     msg: "harga atau stok harus berupa angka",
    //     };
    // }

    try {
        await update(id_pelanggan, nama_pelanggan, alamat, email, no_telepon);
        return {
        status: 200,
        msg: `pelanggan ${nama_pelanggan} berhasil di update`,
        };
    } catch (err) {
        console.log("error update", err.message);
    }
};

const hapusPelanggan = async (id_pelanggan) => {
  if (!(await findById(id_pelanggan))) {
    return {
      status: 404,
      msg: "pelanggan tidak ditemukan",
    };
  }
  const pelanggan = await remove(id_pelanggan);
  return {
    status: 200,
    msg: `pelanggan ${pelanggan.nama_pelanggan} berhasil dihapus`,
  };
};


module.exports = {
  tambahPelanggan,
  tampilPelanggan,
  perbaruiPelanggan,
  cariPelangganDenganId,
  hapusPelanggan,
};
