const router = require('express').Router()
const User = require('../models/User')
const createError = require('../utils/error')
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken')

// CHECKAUTHENTICATION
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("hello user, you are authenticated!")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("hello user, you are authenticated and you can delete your account!")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are authenticated and you can delete all accounts!")
// })

// UPDATE
router.put("/:id", verifyUser, async(req, res, next) => {
    try{
        const updatedUser = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body },  { new: true }) // without { new: true } will only return the previous unupdated document
        res.status(200).json(updatedUser)
    }catch(err){
        next(err)
    }
})

// DELETE
router.delete("/:id", verifyUser, async(req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id) // without { new: true } will only return the previous unupdated document
        res.status(200).json({ "message": "Hotel has been deleted."})
    }catch(err){
        next(err)
    }
})

// GET 
router.get("/:id", verifyUser, async(req, res, next) => {
    try{
        const user = await User.findById(req.params.id) // without { new: true } will only return the previous unupdated document
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
})

// GET ALL
router.get("/", verifyAdmin, async(req, res, next) => {
    try{
        const users = await User.find() // without { new: true } will only return the previous unupdated document
        res.status(200).json(users)
    }catch(err){
        next(err)
    }
})

module.exports = router;