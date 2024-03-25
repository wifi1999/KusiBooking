const router = require('express').Router()
const Hotel = require('../models/Hotel')
const Room = require('../models/Room')
const createError = require('../utils/error')
const { verifyAdmin } = require('../utils/verifyToken')

// CREATE
router.post("/", verifyAdmin, async (req, res, next) => {
    const newHotel = new Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
})

// UPDATE
router.put("/:id", verifyAdmin, async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }) // without { new: true } will only return the previous unupdated document
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
})

// DELETE
router.delete("/:id", verifyAdmin, async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id) // without { new: true } will only return the previous unupdated document
        res.status(200).json({ "message": "Hotel has been deleted." })
    } catch (err) {
        next(err)
    }
})

// GET 
router.get("/find/:id", async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id) // without { new: true } will only return the previous unupdated document
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
})

// GET ALL
router.get("/", async (req, res, next) => {
    const { city, min, max, limit, featured, ...others } = req.query;
    try {
        let query = { ...others };
        if (city !== undefined) query.city = city;
        if (min !== undefined) query.cheapestPrice = { $gt: parseInt(min) || 1 };
        if (max !== undefined) query.cheapestPrice = { ...query.cheapestPrice, $lt: parseInt(max) || 999 };

        const hotels = await Hotel.find(query).limit(parseInt(limit));
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
})

router.get("/countByCity", async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city }) // which is the same as return Hotel.find({ city: city }), but much faster 
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
})

router.get("/countByType", async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const carbinCount = await Hotel.countDocuments({ type: "carbin" })

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: carbinCount },
        ])
    } catch (err) {
        next(err)
    }
})

router.get("/room/:id", async(req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room => {
            return Room.findById(room)
        }))
        res.status(200).json(list)
    }catch(err){
        next(err)
    }
})

module.exports = router;