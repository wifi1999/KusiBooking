const Room = require('../models/Room')
const Hotel = require('../models/Hotel')
const { createError } = require('../utils/error')
const router = require('express').Router()
const { verifyAdmin, verifyToken, verifyUser } = require('../utils/verifyToken')

router.post('/:hotelId', verifyAdmin, async (req, res, next) => {
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedRoom)
    } catch (err) {
        next(err)
    }
})

// UPDATE
router.put("/:id", verifyAdmin, async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }) // without { new: true } will only return the previous unupdated document
        res.status(200).json(updatedRoom)
    } catch (err) {
        next(err)
    }
})

router.put("/availability/:id", verifyAdmin, async (req, res, next) => {
    try{
        await Room.updateOne({ "roomNumbers._id": req.params.id }, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates
            }
        })
        res.status(200).json({ "message": "Room status has been updated."})
    }catch(err){
        next(err)
    }
})

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id }
            })
        } catch (err) {
            next(err)
        }
        await Room.findByIdAndDelete(req.params.id) // without { new: true } will only return the previous unupdated document
        res.status(200).json({ "message": "Room has been deleted." })
    } catch (err) {
        next(err)
    }
})

// GET 
router.get("/:id", async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id) // without { new: true } will only return the previous unupdated document
        res.status(200).json(room)
    } catch (err) {
        next(err)
    }
})

// GET ALL
router.get("/", async (req, res, next) => {
    try {
        const rooms = await Room.find() // without { new: true } will only return the previous unupdated document
        res.status(200).json(rooms)
    } catch (err) {
        next(err)
    }
})


module.exports = router;