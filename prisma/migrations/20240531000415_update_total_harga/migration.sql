/*
  Warnings:

  - Made the column `total_harga` on table `barang` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `barang` MODIFY `total_harga` INTEGER NOT NULL;
