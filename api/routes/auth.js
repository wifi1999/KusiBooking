const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const createError = require('../utils/error')
const jwt = require('jsonwebtoken')

router.post("/register", async(req, res, next) => {
    try{
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        await newUser.save()
        res.status(200).send("User has been created!")
    }catch(err){
        next(err)
    }
})

router.post("/login", async(req, res, next) => {
    try{
        const user = await User.findOne({ username: req.body.username })
        if(!user) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT) // Generate a JSON Web Token after successful authentication, it includes the user's ID and whether they are admit
        // The token is signed using a secret key 

        const { password, isAdmin, ...others } = user._doc
        // set a cookie name called "access_token" in the response, which contain the token generated earlier
        // cookie is only accessible via HTTP request, not the modified client-side javascript
        res.cookie("access_token", token, { httpOnly: true }).status(200).json(others)

    }catch(err){
        next(err)
    }
})

module.exports = router;