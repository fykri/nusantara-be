const express = require("express");
const router = express.Router();
const {
  tambahPelanggan,
  tampilPelanggan,
  perbaruiPelanggan,
  cariPelangganDenganId,
  hapusPelanggan,
} = require("./pelangganServices");


router.get('/:id_pelanggan', async(req,res,next)=> {
    try {
        const {id_pelanggan} = req.params
        const {status, msg, pelanggan} = await cariPelangganDenganId(id_pelanggan)
        res.status(status).json({msg, pelanggan})
    } catch (error) {
        next(error)
    }
})


router.get("/", async (req, res, next) => {
  try {
    const { status, msg, pelanggan } = await tampilPelanggan();
    res.status(status).json({ msg, pelanggan });
  } catch (err) {
    next(err);
  }
});

router.post("/insert", async (req, res, next) => {
    const { nama_pelanggan, alamat, email, no_telepon } = req.body;
    try {
      const { status, msg } = await tambahPelanggan(nama_pelanggan, alamat, email, no_telepon);
      res.status(status).json(msg);
    } catch (err) {
      next(err);
    }
});

router.patch("/update/:id_pelanggan", async (req, res, next) => {
  try {
    const { id_pelanggan } = req.params;
    const { nama_pelanggan, alamat, email, no_telepon } = req.body;
    const { status, msg } = await perbaruiPelanggan(
      id_pelanggan,
      nama_pelanggan,
      alamat,
      email,
      no_telepon
    );
    res.status(status).json(msg);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id_pelanggan", async(req, res, next)=> {
    try {
        const {id_pelanggan} = req.params
        const {status, msg} = await hapusPelanggan(id_pelanggan)
        res.status(status).json(msg)
    } catch (error) {
        next(error)
    }
})


module.exports = router;
