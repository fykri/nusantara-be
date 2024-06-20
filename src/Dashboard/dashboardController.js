const router = require('express').Router()
const {hitungJmlRecBarangMasuk, hitungJmlRecBarangKeluar, hitungJmlRecBarangTerkirim} = require('./dashboardServices')

router.get('/jmlBarangMasuk', async(req, res, next)=> {
    try {
        const {status, msg, data} = await hitungJmlRecBarangMasuk()
        res.status(status).json({msg, data})
    } catch (error) {
        next(error)
    }
})

router.get('/jmlBarangKeluar', async(req, res, next)=> {
    try {
        const {status, msg, data} = await hitungJmlRecBarangKeluar()
        res.status(status).json({msg, data})
    } catch (error) {
        next(error)
    }
})

router.get('/jmlBarangTerkirim', async(req, res, next)=> {
    try {
        const {status, msg, data} = await hitungJmlRecBarangTerkirim()
        res.status(status).json({msg, data})
    } catch (error) {
        next(error)
    }
})
module.exports = router