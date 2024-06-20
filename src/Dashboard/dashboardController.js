const router = require('express').Router()
const {hitungStokBarangMasuk, hitungStokBarangKeluar, hitungStokBarangTerkirim, hitungStokBarang} = require('./dashboardServices')

router.get('/jmlBarangMasuk', async(req, res, next)=> {
    try {
        const {status, msg, data} = await hitungStokBarangMasuk()
        res.status(status).json({msg, data})
    } catch (error) {
        next(error)
    }
})

router.get('/jmlBarangKeluar', async(req, res, next)=> {
    try {
        const {status, msg, data} = await hitungStokBarangKeluar()
        res.status(status).json({msg, data})
    } catch (error) {
        next(error)
    }
})

router.get('/jmlBarangTerkirim', async(req, res, next)=> {
    try {
        const {status, msg, data} = await hitungStokBarangTerkirim()
        res.status(status).json({msg, data})
    } catch (error) {
        next(error)
    }
})

router.get('/jmlBarang', async(req, res, next)=> {
    try {
        const {status, msg, data} = await hitungStokBarang()
        res.status(status).json({msg, data})
    } catch (error) {
        next(error)
    }
})
module.exports = router