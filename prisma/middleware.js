// prisma/middleware.js
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient;

const updateStokMiddleware = async (params, next) => {
    try {
        if (params.model === "Barang_masuk") {
            const { action, args } = params;
            if(action === "create") {
                const {id_barang, kuantitas} = args.data
                if(id_barang && kuantitas !== undefined) {
                    const barang = await prisma.barang.findUnique({
                        where: { id_barang },
                        select: {harga: true, total_harga:true}
                    });
                    await prisma.barang.update({
                        where: {id_barang},
                        data: {
                            stok: {increment: kuantitas},
                            total_harga: barang.total_harga + (kuantitas * barang.harga)
                        }
                    })
                }
            } else if(action === 'delete') {
                const { where } = args;
                const { id_barang_masuk } = where;
                const barangMasuk = await prisma.barang_masuk.findUnique({
                    where: { id_barang_masuk },
                    select: { id_barang: true, kuantitas: true },
                });
                if (barangMasuk) {
                    const barang = await prisma.barang.findUnique({
                        where: { id_barang: barangMasuk.id_barang },
                        select: { harga: true, total_harga: true },
                    });
                    await prisma.barang.update({
                        where: { id_barang: barangMasuk.id_barang },
                        data: { 
                            stok: { decrement: barangMasuk.kuantitas },
                            total_harga: barang.total_harga - (barangMasuk.kuantitas * barang.harga)
                        },
                    });
                }
            } else if(action === 'update') {
                const { where, data } = args;
                const { id_barang_masuk } = where;
                const { kuantitas: newKuantitas } = data;

                if (newKuantitas !== undefined) {
                    const existingBarangMasuk = await prisma.barang_masuk.findUnique({
                        where: { id_barang_masuk },
                        select: { id_barang: true, kuantitas: true },
                    });

                    if (existingBarangMasuk) {
                        const barang = await prisma.barang.findUnique({
                            where: { id_barang: existingBarangMasuk.id_barang },
                            select: { harga: true, stok: true, total_harga: true },
                        });
                        const difference = newKuantitas - existingBarangMasuk.kuantitas;
                        await prisma.barang.update({
                            where: { id_barang: existingBarangMasuk.id_barang },
                            data: { 
                                stok: { increment: difference },
                                total_harga: barang.total_harga + (difference * barang.harga)
                            },
                        });
                    }
                }
            }
        }
    return await next(params)
    } catch (error) {
        console.error("Error in updateStokMiddleware:", error);
        throw error;
    }

};

const updateTotalHargaMiddleware = async (params, next) => {
    if (params.model === "Barang") {
        const { action, args } = params;

        if (action === "create" || action === "update") {
            const data = args.data;

            if (data.harga !== undefined || data.stok !== undefined) {
                let currentBarang = {};
                if (action === "update") {
                    currentBarang = await prisma.barang.findUnique({
                        where: { id_barang: args.where.id_barang }
                    });
                }

                const harga = data.harga !== undefined ? data.harga : currentBarang.harga;
                const stok = data.stok !== undefined ? data.stok : currentBarang.stok;
                data.total_harga = harga * stok;
            }
        }
    }

    return await next(params);
};
  
module.exports = {
    updateStokMiddleware,
    updateTotalHargaMiddleware
};
