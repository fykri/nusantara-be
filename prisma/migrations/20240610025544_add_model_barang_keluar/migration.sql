-- AlterTable
ALTER TABLE `barang` MODIFY `stok` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Barang_keluar` (
    `id_barang_keluar` VARCHAR(191) NOT NULL,
    `id_barang` VARCHAR(191) NOT NULL,
    `id_pelanggan` VARCHAR(191) NOT NULL,
    `kuantitas` INTEGER NOT NULL,
    `tanggal_keluar` DATETIME(3) NOT NULL,
    `total_harga` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_barang_keluar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Barang_keluar` ADD CONSTRAINT `Barang_keluar_id_barang_fkey` FOREIGN KEY (`id_barang`) REFERENCES `Barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Barang_keluar` ADD CONSTRAINT `Barang_keluar_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `Pelanggan`(`id_pelanggan`) ON DELETE CASCADE ON UPDATE CASCADE;
