const router = require('express').Router()
const {
    tambahBarangMasuk, 
    tampilBarangMasuk, 
    perbaruiBarangMasuk, 
    hapusBarangMasuk, 
    cariBarangMasukDenganId
} = require('./barangMskServices')


router.get('/', async(req, res)=> {
    try {
        const { status, msg, barangMsk } = await tampilBarangMasuk();
        res.status(status).json({msg, barangMsk});
      } catch (err) {
        next(err);
      }
})

router.get('/:id_barang_masuk', async(req,res,next)=> {
    try {
        const {id_barang_masuk} = req.params
        const {status, msg, barang} = await cariBarangMasukDenganId(id_barang_masuk)
        res.status(status).json({msg, barang})
    } catch (error) {
        next(error)
    }
})

router.post('/insert', async(req, res, next)=> {
    const {id_barang, tanggal_masuk, kuantitas} = req.body
    try {
        const {status, msg} = await tambahBarangMasuk(id_barang, tanggal_masuk, kuantitas)
        res.status(status).json(msg)
    } catch (error) {
        next(error)
    }
})

router.patch("/update/:id_barang_masuk", async (req, res, next) => {
    try {
      const { id_barang_masuk } = req.params;
      const { id_barang, tanggal_masuk, kuantitas } = req.body;
      const { status, msg } = await perbaruiBarangMasuk(
        id_barang_masuk,
        id_barang,
        tanggal_masuk,
        kuantitas
      );
      res.status(status).json(msg);
    } catch (error) {
      next(error);
    }
});

router.delete('/delete/:id_barang_masuk', async(req, res,next)=> {
    try {
        const {id_barang_masuk} = req.params
        const {status, msg} = await hapusBarangMasuk(id_barang_masuk)
        res.status(status).json(msg)
    } catch (error) {
        next(error)
    }
})
module.exports = router