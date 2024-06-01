const prisma = require('../../prisma/prismaClient')

const getALl = async()=> {
    return await prisma.pelanggan.findMany()
}

const insertData = async(nama_pelanggan, alamat, email, no_telpon)=> {
    const id_pelanggan = `PLG-${Math.floor(Math.random() * 99999999).toString().padStart(8, '0')}`; 
    return await prisma.pelanggan.create({
        data: {
            id_pelanggan,
            nama_pelanggan,
            alamat,
            email,
            no_telpon
        }
    })
}

const getById = async(id_pelanggan) => {
    return await prisma.pelanggan.findUnique({
        where: {id_pelanggan}
    })
}

const update = async(id_pelanggan, nama_pelanggan, alamat, email, no_telpon) => {
    return await prisma.pelanggan.update({
        where: {id_pelanggan},
        data: {
            nama_pelanggan,
            alamat,
            email,
            no_telpon
        }
    })
}

const remove = async(id_pelanggan) => {
    return await prisma.pelanggan.delete({
        where: {
            id_pelanggan,
        },
    });
}
module.exports = {
    getALl,
    insertData,
    getById,
    update,
    remove
};
  