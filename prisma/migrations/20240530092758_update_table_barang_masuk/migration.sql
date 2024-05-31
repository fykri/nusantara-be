-- DropForeignKey
ALTER TABLE `barang_masuk` DROP FOREIGN KEY `barang_masuk_id_barang_fkey`;

-- AddForeignKey
ALTER TABLE `Barang_masuk` ADD CONSTRAINT `Barang_masuk_id_barang_fkey` FOREIGN KEY (`id_barang`) REFERENCES `Barang`(`id_barang`) ON DELETE RESTRICT ON UPDATE CASCADE;
