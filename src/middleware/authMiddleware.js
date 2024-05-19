const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (request, respond, next) => {
    const token = request.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (error, user) {
        if (error) {
            return respond.status(404).json({
                message: 'Authentication failed',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin) {
            next()
        } else {
            return respond.status(404).json({
                message: 'Authentication failed',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleWare = (request, respond, next) => {
    const token = request.headers.token.split(' ')[1]
    const userId = request.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (error, user) {
        if (error) {
            return respond.status(404).json({
                message: 'Authentication failed',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return respond.status(404).json({
                message: 'Authentication failed',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}