const { PrismaClient } = require('@prisma/client')
const { updateTotalHargaMiddleware, updateStokMiddleware } = require('./middleware')

const prisma = new PrismaClient()

prisma.$use(updateTotalHargaMiddleware)
prisma.$use(updateStokMiddleware)

module.exports = prisma