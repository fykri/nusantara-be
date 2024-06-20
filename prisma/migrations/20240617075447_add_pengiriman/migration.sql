-- AlterTable
ALTER TABLE `barang_keluar` ADD COLUMN `terkirim` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Pengiriman` (
    `id_pengiriman` VARCHAR(191) NOT NULL,
    `id_barang_keluar` VARCHAR(191) NOT NULL,
    `tanggal_pengiriman` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Pengiriman_id_barang_keluar_key`(`id_barang_keluar`),
    PRIMARY KEY (`id_pengiriman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pengiriman` ADD CONSTRAINT `Pengiriman_id_barang_keluar_fkey` FOREIGN KEY (`id_barang_keluar`) REFERENCES `Barang_keluar`(`id_barang_keluar`) ON DELETE CASCADE ON UPDATE CASCADE;
