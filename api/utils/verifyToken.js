const jwt = require('jsonwebtoken')
const createError = require('../utils/error')

// main idea: verifyToken is used for user authentication to be able to use defined routes, 
           // verifyUser is used for authenticated user for general authorization
           // verifyAdmin is used for authenticated user for admin-specific authorization

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if(!token) return next(createError(401, "You are not authenticated!"))
    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "Token is not valid!"))
        req.user = user
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if(err) return next(err)

        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if(err) return next(err)

        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}

module.exports = { verifyToken, verifyUser, verifyAdmin }