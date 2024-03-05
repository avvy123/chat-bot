const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
require("dotenv").config({ path: '../frontend/chat-bot/.env' })

const app = express()

//  Middlewares
app.use(cors())
app.use(express.json())
app.use("/api/auth", userRoutes)

// MongoDB connection 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected")
}).catch((error) => {
    console.log("Database is not connected", error)
})

app.get('/', (req, res) => {
    res.send("<h1>Server is working</h1>")
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})
