const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const hotelRoute = require('./routes/hotel')
const roomRoute = require('./routes/room')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
dotenv.config()

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Conected to MongoDB!")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log("MongoDB disconnected!")
})

// MIDDLEWARES
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/hotel", hotelRoute)
app.use("/api/room", roomRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(8080, () => {
    connect()
    console.log("Server is listening on port 8080")
})