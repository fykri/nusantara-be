# WMS NUSANTARA BACKEND

![Logo](https://imgtr.ee/images/2024/06/24/8ea2092c83467a10bd0196ebf7e86240.png)

aplikasi ini dibangun untuk mengelola data barang "Ban" yang masuk dan keluar gudang.
Github ini merupakan bagian backend dari sistem kami, untuk melihat sisi Frontend bisa klik url dibawah ini: https://github.com/MarshallRifqi/nusantara-fe


## Tech Stack
- Node Js
- Express Js
- Mysql
- Prisma


## Project Setup
### clone repository :
```sh
clone https://github.com/fykri/nusantara-be.git
```
### navigate to the repository :
```sh
cd backend
```
### install dependencies :
```sh
npm install
```

### prisma migration :
```sh
npx prisma migrate dev --name init
```

### Environment Variable Settings
1. Salin file `.env.example` dan beri nama `.env`:
   ```sh
   copy .env.example .env
   ```
2. Isi nilai-nilai yang diperlukan di dalam `.env` sesuai dengan konfigurasi yang dibutuhkan.


### start the server :
```sh
npm run dev
```

## Access the API
Sistem kami menggunakan "Swagger" untuk mempermudah frontend dalam mengakses API atau melakukan uji coba API backend dari sistem kami. Untuk mengaksesnya, pastikan server sudah berjalan terlebih dahulu, kemudian kunjungi URL berikut: http://localhost:2000/api-docs/

