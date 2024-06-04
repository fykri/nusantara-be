const express = require("express");
const router = express.Router();
const { Register, login, refreshToken, logout } = require("./authServices");

router.post("/register", async (req, res, next) => {
    const { username, password, confirmPassword } = req.body;
    try {
        const { status, berhasil, msg } = await Register(
            username,
            password,
            confirmPassword
        );
        res.status(status).json({
            berhasil,
            msg,
        });
    } catch (err) {
        next(err);
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const { status, msg, refreshToken, accesToken } = await login(
            username,
            password
        );
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(status).json({
            accesToken,
            msg
        });
    } catch (error) {
        res.send(error);
    }
});

router.get("/token", async (req, res) => {
    const getToken = req.cookies.refreshToken;
    try{
        const {status, msg, token} = await refreshToken(getToken);
        res.status(status).json({msg, token});
    }catch(err){
        console.log('err', err);
    }
});

router.delete('/logout', async(req,res)=>{
    const token = req.cookies.refreshToken
    try{
        const user = await logout(token)
        res.clearCookie(user.nameCookie) 
        return res.status(user.status).json({msg: user.msg})
    } catch(err){
        console.log('errorLogout', err);
    }
})

module.exports = router;
