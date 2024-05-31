const prisma = require("../../prisma/prismaClient");
const moment = require("moment");

async function generateNoDo() {
    const date = moment().format("YYYYMMDD");
    const no_do = `DO-${date}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
    
    return no_do;
}
//logic database
const getALl = async () => {
  const barang_masuk = await prisma.barang_masuk.findMany({
    select: {
        id_barang_masuk: true,
        id_barang: true,
        no_do:true,
        kuantitas: true,
        tanggal_masuk: true,
        barang:{
            select:{
                nama_barang:true,
                kategori: true
            }
        }
    },
    orderBy: {
      createdAt: 'desc'  
    },
  });
  return barang_masuk
};

const insertData = async (id_barang, tanggal_masuk, kuantitas) => {
    const id_barang_masuk = `BMS-${Math.floor(Math.random() * 99999999).toString().padStart(8, '0')}`;
    const no_do = await generateNoDo()
    const barang_masuk = await prisma.barang_masuk.create({
        data: {
            id_barang_masuk,
            id_barang,
            no_do,
            tanggal_masuk: moment(tanggal_masuk),
            kuantitas: Number(kuantitas)
        },
    });
    
    return barang_masuk
};

const getById = async (id_barang_masuk) => {
    return prisma.barang_masuk.findUnique({
      where: {
        id_barang_masuk
      },
      select: {
        id_barang_masuk: true,
        id_barang: true,
        no_do:true,
        kuantitas: true,
        tanggal_masuk: true,
        barang:{
            select:{
                nama_barang:true,
                kategori: true
            }
        }
    },
    });
};

const update = async (id_barang_masuk,id_barang, tanggal_masuk, kuantitas) => {
    try {
        const updateBarangMsk = await prisma.barang_masuk.update({
            where: {id_barang_masuk},
            data: {
                id_barang,
                tanggal_masuk: moment(tanggal_masuk),
                kuantitas:Number(kuantitas)
            }
        })
        return updateBarangMsk
    } catch (error) {
        console.log(error);
    }
}

const remove = async (id_barang_masuk) => {
    return await prisma.barang_masuk.delete({
      where: {
        id_barang_masuk,
      },
    });
};


module.exports = {
  getALl,
  insertData,
  getById,
  update,
  remove
};
