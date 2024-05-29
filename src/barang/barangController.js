const express = require("express");
const router = express.Router();
const {
  tambahBarang,
  tampilBarang,
  perbaruiBarang,
  cariBarangDenganId,
  hapusBarang,
  cariBarangDenganNama
} = require("./barangServices");


router.get('/:id_barang', async(req,res,next)=> {
    try {
        const {id_barang} = req.params
        const {status, msg, barang} = await cariBarangDenganId(id_barang)
        res.status(status).json({msg, barang})
    } catch (error) {
        next(error)
    }
})

router.get('/:nama_barang', async(req, res, next)=> {
    try {
        const {nama_barang} = req.params
        const {status, msg, barang} = await cariBarangDenganNama(nama_barang)
        res.status(status).json({msg, barang})
    } catch (error) {
        next(error)
    }
})

router.get("/", async (req, res, next) => {
  try {
    const { status, msg, barang } = await tampilBarang();
    res.status(status).json({ msg, barang });
  } catch (err) {
    next(err);
  }
});

router.post("/insert", async (req, res, next) => {
    const { nama_barang, kategori, harga, stok } = req.body;
    try {
      const { status, msg } = await tambahBarang(nama_barang, kategori, harga, stok);
      res.status(status).json(msg);
    } catch (err) {
      next(err);
    }
});

router.patch("/update/:id_barang", async (req, res, next) => {
  try {
    const { id_barang } = req.params;
    const { nama_barang, kategori, harga } = req.body;
    const { status, msg } = await perbaruiBarang(
      id_barang,
      nama_barang,
      kategori,
      harga
    );
    res.status(status).json(msg);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id_barang", async(req, res, next)=> {
    try {
        const {id_barang} = req.params
        const {status, msg} = await hapusBarang(id_barang)
        res.status(status).json(msg)
    } catch (error) {
        next(error)
    }
})


module.exports = router;
