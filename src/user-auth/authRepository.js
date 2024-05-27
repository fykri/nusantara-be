const prisma = require('../db/prisma')
const bcrypt = require('bcrypt')

const insertData =  async(username, password)=> {
    const salt = await bcrypt.genSalt(10)
    const hasspassword = await bcrypt.hash(password, salt)
    const user =  await prisma.user.create({
        data: {
            username,
            password: hasspassword
        }
    })
    return user
}

const findEmail = async(username)=> {
    const user = await prisma.user.findFirst({
        where:{
            username
        } 
    })

    return user
}

const updateToken = async(token, idUser) => {
    let user = await prisma.user.update({
        where: {
            idUser
        },
        data: {
            token,
        }
    })
    return user
}

const findToken = async(token)=>{
    const refreshToken = await prisma.user.findFirst({
        where:{
            token
        }
    })
    return refreshToken
}
module.exports = {
    insertData,
    findEmail,
    updateToken,
    findToken
}