const { insertData, findEmail, updateToken, findToken } = require("./authRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require('util');
const verifyToken = promisify(jwt.verify);

module.exports = {
  //fungsi Register
  Register: async (username, password, confirmPassword) => {
    if (!username || !password) {
      return {
        status: 400,
        msg: "Invalid register, please try again",
      };
    }

    if (await findEmail(username)) {
      return {
        status: 409,
        msg: "Email Sudah Terdaftar",
      };
    }
    if (password != confirmPassword) {
      return {
        status: 400,
        msg: "password tidak sama dengan confirm Password",
      };
    }

    await insertData(username, password);
    return {
      status: 200,
      berhasil: true,
      msg: "Registrasi berhasil",
    };
  },

  // Fungsi Login
  login: async (email, password) => {
    if (!email || !password) {
      return {
        status: 400,
        msg: "Invalid login, please try again",
      };
    }

    try {
      const user = await findEmail(email);
      if (!user) {
        return {
          status: 400,
          msg: "email tidak ditemukan",
        };
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return {
          status: 400,
          msg: "password wrong",
        };
      }
      const { idUser, username } = user;
      const accesToken = jwt.sign({ idUser, username },process.env.ACCESS_TOKEN_SECRET,{
          expiresIn: "20s",
      });

      const refreshToken = jwt.sign({ idUser, username },process.env.REFRESH_TOKEN_SECRET,{
          expiresIn: "1d",
      });
      // return refresToken
      await updateToken(refreshToken, idUser);
      return {
        status: 200,
        berhasil: true,
        msg: "login berhasil",
        refreshToken,
        accesToken,
      };
    } catch (error) {
      console.log("error: ", error);
    }
  },

  //mendapatkan token
  refreshToken: async (token) => {
    if (!token) {
      return {
        status: 401,
        msg:'gagal mendapatkan refresh token'
      };
    }
  
    try {
      const user = await findToken(token);
      if (!user) {
        return { status: 403, msg: 'token tidak ada di database' };
      }
  
      await verifyToken(token, process.env.REFRESH_TOKEN_SECRET);
  
      const { idUser, username } = user;
      const accessToken = jwt.sign({ idUser, username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
      });
  
      return {
        status: 200,
        msg: accessToken,
      };
    } catch (err) {
      console.log('error', err.message);
    }
  },

  logout: async (token)=>{
    if(!token) return {status: 204}
    const refreshToken = await findToken(token)
    if(!refreshToken) return{status:204}

    const {idUser} = refreshToken
    const deleteToken = null
    await updateToken(deleteToken ,idUser)
    return {
      nameCookie:'refreshToken',
      status:200
    }
  }
}
