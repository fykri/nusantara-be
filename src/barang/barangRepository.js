const prisma = require("../../prisma/prismaClient");

const insertData = async (nama_barang, kategori, harga) => {
    const randomNo = Math.floor(Math.random() * 99999999).toString().padStart(8, '0');
    const id_barang = `BRG-${randomNo}`;
    const stok = 0
    const hargaInt = parseInt(harga)
    try {
        return await prisma.barang.create({
            data: {
                id_barang,
                nama_barang,
                kategori,
                harga: hargaInt,
                stok: stok,
                total_harga: 0
            },
        });
    } catch (err) {
        console.log(err);
    }
};

const findByname = async (nama_barang) => {
    return await prisma.barang.findFirst({
        where: {nama_barang}
    })
}

const getALl = async () => {
    try {
        return await prisma.barang.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        });
    } catch (err) {
        console.log(err);
    }
};

const update = async (id_barang, nama_barang, kategori, harga) => {
    return await prisma.barang.update({
        where: { id_barang },
        data: {
            nama_barang,
            kategori,
            harga: parseInt(harga),
        },
    });
};

const findByIdBarang = async (id_barang) => {
    return prisma.barang.findUnique({
        where: { id_barang,},
    });
};

const remove = async (id_barang) => {
    return await prisma.barang.delete({
        where: {
            id_barang,
        },
    });
};

module.exports = {
  insertData,
  getALl,
  update,
  findByIdBarang,
  remove,
  findByname
};
