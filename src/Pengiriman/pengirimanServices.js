const { dataListPengiriman, updateList, dataListRiwayat, detail, findByIdPengiriman} = require('./pengirimanRepository')

const listPengiriman = async() => {
    try {
        const pengiriman = await dataListPengiriman();
        if (pengiriman.length === 0) {
            return { status: 404, msg: "Oops, tabel ini masih kosong! Mulailah dengan menambahkan data baru" };
        }
        return {
            status: 200,
            msg: "barang ada",
            data: pengiriman,
        };
    } catch (err) {
        console.log("terjadi kesalahan", err);
    }
}

const listRiwayatPengiriman = async() => {
    try {
        const listRiwayat = await dataListRiwayat();
        if (listRiwayat.length === 0) {
            return { status: 404, msg: "Oops, tabel ini masih kosong! Mulailah dengan menambahkan data baru" };
        }
        return {
            status: 200,
            msg: "barang ada",
            data: listRiwayat,
        };
    } catch (err) {
        console.log("terjadi kesalahan", err);
    }
}

const konfirmasiPengiriman = async(id_pengiriman) => {
    if(!id_pengiriman) {
        return {
            status: 404,
            msg: "id pengiriman tidak boleh kosong",
        }
    }
    const pengiriman = await findByIdPengiriman(id_pengiriman)
    if(!pengiriman) {
        return {
            status: 404,
            msg: 'barang tidak ditemukan'
        }
    }
    try {
        await updateList(id_pengiriman)
        return {
            status: 200,
            msg: 'berhasil Terkirim'
        }
    } catch (error) {
        console.log(error.message);
    }
}

const detailTerkirim = async(id_pengiriman) => {
    try {
        const detailPengiriman = await detail(id_pengiriman);
        if(!detailPengiriman) {
            return {
                status: 404,
                msg: 'data tidak ditemukan'
            }
        }
        if (detailPengiriman.length === 0) {
            return { status: 404, msg: "Oops, tabel ini masih kosong! Mulailah dengan menambahkan data baru" };
        }
        
        return {
            status: 200,
            msg: "barang ada",
            data: detailPengiriman,
        };
    } catch (err) {
        console.log("terjadi kesalahan", err);
    }
}

module.exports = {
    listPengiriman,
    listRiwayatPengiriman,
    konfirmasiPengiriman,
    detailTerkirim
}