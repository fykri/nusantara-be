const router = require('express').Router()
const {kirimBarang, listPengiriman, listRiwayatPengiriman, konfirmasiPengiriman, detailTerkirim} = require('./pengirimanServices')


// Mendapatkan semua data dari ListPengiriman
router.get('/', async(req, res, next)=> {
    try {
        const { status, msg, data } = await listPengiriman();
        res.status(status).json({msg, data});
    } catch (err) {
        next(err);
    }
})

// Mendapatkan semua data dari Riwayat Pengiriman
router.get('/riwayat-pengiriman', async(req, res, next)=> {
    try {
        const { status, msg, data } = await listRiwayatPengiriman();
        res.status(status).json({msg, data});
    } catch (err) {
        next(err);
    }
})

// Ketika menekan tombol konfirmasi di list pengiriman
router.patch('/konfirmasi/:id_pengiriman', async(req, res, next)=> {
    try {
        const {id_pengiriman} = req.params
        const {status, msg} = await konfirmasiPengiriman(id_pengiriman)    
        res.status(status).json({msg})    
    } catch (error) {
        next(error)
    } 
})

// Ketika melihat detail di riwayat Pengiriman
router.get('/riwayat-pengiriman/detail/:id_pengiriman', async(req, res, next)=> {
    try {
        const {id_pengiriman} = req.params
        const { status, msg, data } = await detailTerkirim(id_pengiriman);
        res.status(status).json({msg, data});
    } catch (err) {
        next(err);
    }
})

module.exports = router
