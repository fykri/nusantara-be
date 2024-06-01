-- CreateTable
CREATE TABLE `Pelanggan` (
    `id_pelanggan` VARCHAR(191) NOT NULL,
    `nama_pelanggan` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `no_telpon` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_pelanggan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
