const prisma = require("../db/prisma");

const insertData = async (nama_barang, kategori, harga, stok) => {
    const randomNo = Math.floor(Math.random() * 99999999).toString().padStart(8, '0');
    const id_barang = `BRG-${randomNo}`;
    try {
            const barang = await prisma.barang.create({
                data: {
                    id_barang,
                    nama_barang,
                    kategori,
                    harga: parseFloat(harga),
                    stok: parseInt(stok),
                },
            });
            return barang;
    
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
    const barang = await prisma.barang.findMany({
        orderBy:{
            createdAt: 'desc'
        }
    });
    return barang;
  } catch (err) {
    console.log(err);
  }
};

const update = async (id_barang, nama_barang, kategori, harga) => {
    const updateBarang = await prisma.barang.update({
        where: { id_barang },
        data: {
        nama_barang,
        kategori,
        harga: parseFloat(harga),
        stok
        },
    });
    return updateBarang;
};

const findById = async (id_barang) => {
  return prisma.barang.findUnique({
    where: { 
      id_barang,
    },
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
  findById,
  remove,
  findByname
};
