const { PrismaClient } = require('@prisma/client');
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
            // } else if(action === 'delete') {
            //     const { where } = args;
            //     const { id_barang_masuk } = where;
            //     const barangMasuk = await prisma.barang_masuk.findUnique({
            //         where: { id_barang_masuk },
            //         select: { id_barang: true, kuantitas: true },
            //     });
            //     if (barangMasuk) {
            //         const barang = await prisma.barang.findUnique({
            //             where: { id_barang: barangMasuk.id_barang },
            //             select: { harga: true, total_harga: true },
            //         });
            //         await prisma.barang.update({
            //             where: { id_barang: barangMasuk.id_barang },
            //             data: { 
            //                 stok: { decrement: barangMasuk.kuantitas },
            //                 total_harga: barang.total_harga - (barangMasuk.kuantitas * barang.harga)
            //             },
            //         });
            //     }
            } else if (action === 'update') {
                const { where, data } = args;
                const { id_barang_masuk } = where;
                const { kuantitas } = data;
            
                if (kuantitas !== undefined) {
                    const existingBarangMasuk = await prisma.barang_masuk.findUnique({
                        where: { id_barang_masuk },
                        select: { id_barang: true, kuantitas: true },
                    });
            
            
                    const barang = await prisma.barang.findUnique({
                        where: { id_barang: existingBarangMasuk.id_barang },
                        select: { id_barang: true, harga: true, stok: true, total_harga: true },
                    });

            
                    const existingKuantitas = existingBarangMasuk.kuantitas;
                    const difference = kuantitas - existingKuantitas;
            
                    if (data.id_barang && data.id_barang !== existingBarangMasuk.id_barang) {
                        const newBarang = await prisma.barang.findUnique({
                            where: { id_barang: data.id_barang },
                            select: { id_barang: true, harga: true, stok: true, total_harga: true },
                        });
            
                        if (!newBarang) {
                            throw new Error('Barang baru tidak ditemukan');
                        }
            
                        await prisma.barang.update({
                            where: { id_barang: existingBarangMasuk.id_barang },
                            data: {
                                stok: { decrement: existingKuantitas },
                                total_harga: { decrement: existingKuantitas * barang.harga }
                            }
                        });
            
                        await prisma.barang.update({
                            where: { id_barang: data.id_barang },
                            data: {
                                stok: { increment: kuantitas },
                                total_harga: { increment: kuantitas * newBarang.harga }
                            }
                        });
                    } else {
                        await prisma.barang.update({
                            where: { id_barang: barang.id_barang },
                            data: {
                                stok: { increment: difference },
                                total_harga: { increment: difference * barang.harga }
                            }
                        });
                    }
            
                    await prisma.barang_masuk.update({
                        where: { id_barang_masuk },
                        data: { kuantitas }
                    });
                }
            }            
        } else if (params.model === "Barang_keluar") {
            if(params.action === "create") {
                const {data} = params.args
                const {id_barang, kuantitas} = data

                const barang = await prisma.barang.findUnique({
                    where: { id_barang },
                });
                const totalHargaKeluar = kuantitas * barang.harga;
                data.total_harga = totalHargaKeluar;
                await prisma.barang.update({
                    where: {id_barang},
                    data: {
                        stok: {
                            decrement: kuantitas
                        },
                        total_harga: {
                            decrement: totalHargaKeluar
                        }
                    }
                })
            } else if (params.action === 'update') {
                const { where, data } = params.args;
                const { id_barang_keluar } = where;
                const { kuantitas } = data;
            
                if (kuantitas !== undefined) {
                    const existingBarangKeluar = await prisma.barang_keluar.findUnique({
                        where: { id_barang_keluar },
                        select: { id_barang: true, kuantitas: true, barang:true },
                    });
            
            
                    const barang = await prisma.barang.findUnique({
                        where: { id_barang: existingBarangKeluar.id_barang },
                        select: { id_barang: true, harga: true, stok: true, total_harga: true },
                    });

            
                    const existingKuantitas = existingBarangKeluar.kuantitas;
                    const difference = kuantitas - existingKuantitas;
            
                    if (data.id_barang && data.id_barang !== existingBarangKeluar.id_barang) {
                        const newBarang = await prisma.barang.findUnique({
                            where: { id_barang: data.id_barang },
                            select: { id_barang: true, harga: true, stok: true, total_harga: true },
                        });
            
                        await prisma.barang.update({
                            where: { id_barang: existingBarangKeluar.id_barang },
                            data: {
                                stok: { increment: existingKuantitas },
                                total_harga: { increment: existingKuantitas * barang.harga }
                            }
                        });
            
                        await prisma.barang.update({
                            where: { id_barang: data.id_barang },
                            data: {
                                stok: { decrement: kuantitas },
                                total_harga: { decrement: kuantitas * newBarang.harga }
                            }
                        });
                    } else {
                        await prisma.barang.update({
                            where: { id_barang: barang.id_barang },
                            data: {
                                stok: { decrement: difference },
                                total_harga: { decrement: difference * existingBarangKeluar.barang.harga }
                            }
                        });
                    }
                }
            } else if(params.action === 'delete') {
                const { where } = params.args;
                const { id_barang_keluar } = where;

                const barangKeluar = await prisma.barang_keluar.findUnique({
                    where: { id_barang_keluar },
                    select: { id_barang: true, kuantitas: true },
                });

                const { id_barang, kuantitas } = barangKeluar;
                const barang = await prisma.barang.findUnique({
                    where: { id_barang },
                    select: { harga: true, stok: true, total_harga: true },
                });

                const { harga, stok } = barang;
                const stokBaru = stok + kuantitas;
                const totalHargaBaru = stokBaru * harga;
                await prisma.barang.update({
                    where: { id_barang },
                    data: {
                        stok: {increment: barangKeluar.kuantitas},
                        total_harga: totalHargaBaru,
                    },
                });
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
        const { where, data } = args;

        if (action === "update" && where && where.id_barang) {
            const { id_barang } = where;

            const currentBarang = await prisma.barang.findUnique({
                where: { id_barang: id_barang },
                select: { harga: true, stok: true }
            });

            const barangKeluarList = await prisma.barang_keluar.findMany({
                where: { id_barang: id_barang }
            });

            for (const barangKeluar of barangKeluarList) {
                await prisma.barang_keluar.update({
                    where: { id_barang_keluar: barangKeluar.id_barang_keluar },
                    data: {
                        total_harga: barangKeluar.kuantitas * (data.harga !== undefined ? data.harga : currentBarang.harga)
                    }
                });
            }

            const newHarga = data.harga !== undefined ? data.harga : currentBarang.harga;
            const newStok = data.stok !== undefined ? data.stok : currentBarang.stok;

            if (data.harga !== undefined || data.stok !== undefined) {
                args.data.total_harga = newHarga * newStok;
            }
        }
    }

    return await next(params);
};


  
module.exports = {
    updateStokMiddleware,
    updateTotalHargaMiddleware
};
