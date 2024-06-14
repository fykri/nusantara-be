const validator = require('validator')

const {
    getALl,
    insertData,
    findByIdPelanggan,
    update,
    remove
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

const tambahPelanggan = async (nama_pelanggan, alamat, email, no_telepon) => { 
    if (!nama_pelanggan || !alamat || !email || !no_telepon) {
        return {
        status: 404,
        msg: "Sumber daya tidak ditemukan: Semua input harus diisi",
        };
    }

    if(!validator.isEmail(email)) {
        return {
            status: 400,
            msg: 'Email tidak valid'
        }
    }

    if (!validator.isMobilePhone(no_telepon, 'id-ID')) {
        return {
            status: 400,
            msg: 'Nomor telpon tidak valid'
        }
    }

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
    if (!await findByIdPelanggan(id_pelanggan)) {
        return {
            status: 404,
            msg: `pelanggan tidak ditemukan`,
        };
    }
    if (!id_pelanggan || !nama_pelanggan || !alamat || !email || !no_telepon) {
        return {
            status: 404,
            msg: "Sumber daya tidak ditemukan: Semua input harus diisi",
        };
    }

    if(!validator.isEmail(email)) {
        return {
            status: 400,
            msg: 'Email tidak valid'
        }
    }

    if (!validator.isMobilePhone(no_telepon, 'id-ID')) {
        return {
            status: 400,
            msg: 'Nomor telpon tidak valid'
        }
    }

    try {
        const pelanggan = await getById(id_pelanggan)
        await update(id_pelanggan, nama_pelanggan, alamat, email, no_telepon);
        return {
            status: 200,
            msg: `pelanggan ${pelanggan.nama_pelanggan} berhasil di update menajadi ${nama_pelanggan}`,
        };
    } catch (err) {
        console.log("error update", err.message);
    }
};

const hapusPelanggan = async (id_pelanggan) => {
    if (!(await findByIdPelanggan(id_pelanggan))) {
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
    hapusPelanggan,
};
