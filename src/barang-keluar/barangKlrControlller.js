const {tampilBarangKeluar, tambahBarangKeluar, updateBarangKeluar, hapusBarangKeluar} = require('./barangKlrServices')
const router = require('express').Router()

router.get('/', async(req, res, next)=> {
    try {
        const { status, msg, barangKlr } = await tampilBarangKeluar();
        res.status(status).json({msg, barangKlr});
    } catch (err) {
        next(err);
    }
})


router.post('/insert', async(req, res, next)=> {
    const {id_barang, id_pelanggan, kuantitas, tanggal_keluar} = req.body
    try {
        const {status, msg} = await tambahBarangKeluar(id_barang, id_pelanggan, kuantitas, tanggal_keluar)  
        res.status(status).json(msg)
    } catch (error) {
        next(error)
    }
})

router.put('/update/:id_barang_keluar', async(req, res, next)=> {
    try {
        const {id_barang_keluar} = req.params
        const {id_barang, id_pelanggan, kuantitas, tanggal_keluar} = req.body
        const {status, msg} = await updateBarangKeluar(id_barang_keluar, id_barang, id_pelanggan, kuantitas, tanggal_keluar)
        res.status(status).json(msg)
    } catch (error) {
        next(error)
    }
})

router.delete('/delete/:id_barang_keluar', async(req, res,next)=> {
    try {
        const {id_barang_keluar} = req.params
        const {status, msg} = await hapusBarangKeluar(id_barang_keluar)
        res.status(status).json(msg)
    } catch (error) {
        next(error)
    }
})


module.exports = router