const express = require("express");
const app = express();
const session = require("express-session");
const cookie = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
const port = process.env.PORT;
app.use(cookie());
app.use(cors({credentials: true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { verifyToken } = require("./user-auth/middleware/authmiddleware");


app.get("/user", verifyToken, (req, res) => {
  res.send("ini halaman user");
});


const user = require("./user-auth/authController");
const barang= require("./barang/barangController")
const pelanggan= require("./pelanggan/pelangganController")
const barang_masuk = require('./barang_masuk/barangMskController')
app.use("/", user);
app.use('/barang', barang)
app.use('/barang-masuk', barang_masuk)
app.use('/pelanggan', pelanggan)

app.use((_req, res) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

app.use((err, _req, res) => {
  return res.status(500).json({
    status: false,
    message: "Internal server error " + err.message,
    data: null,
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
