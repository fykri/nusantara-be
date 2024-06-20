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

// Swagger 
const swaggerUi = require('swagger-ui-express');
const apiDoc = require('./apidocs.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDoc))
// End Swagger


app.get("/user", verifyToken, (req, res) => {
    res.send("ini halaman user");
});


const user = require("./user-auth/authController");
const barang= require("./barang/barangController")
const pelanggan= require("./pelanggan/pelangganController")
const barang_masuk = require('./barang-masuk/barangMskController')
const barang_keluar = require('./barang-keluar/barangKlrControlller')
const pengiriman = require('../src/Pengiriman/pengirimanController')
const dashboard = require('../src/dashboard/dashboardController')
app.use("/", user);
app.use('/barang', barang)
app.use('/barang-masuk', barang_masuk)
app.use('/pelanggan', pelanggan)
app.use('/barang-keluar', barang_keluar)
app.use('/pengiriman', pengiriman)
app.use('/dashboard', dashboard)

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
