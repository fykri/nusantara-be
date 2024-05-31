-- DropForeignKey
ALTER TABLE `barang_masuk` DROP FOREIGN KEY `Barang_masuk_id_barang_fkey`;

-- AlterTable
ALTER TABLE `barang` ADD COLUMN `total_harga` BIGINT NULL,
    MODIFY `harga` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Barang_masuk` ADD CONSTRAINT `Barang_masuk_id_barang_fkey` FOREIGN KEY (`id_barang`) REFERENCES `Barang`(`id_barang`) ON DELETE CASCADE ON UPDATE CASCADE;
