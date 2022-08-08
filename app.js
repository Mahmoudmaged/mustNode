const express = require("express");
const app = express()
const router = require("./app.routes");
const connectDB = require("./DB/connection");
const cors = require('cors')
const port  = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(router)


connectDB()
app.listen(port, () => {
    console.log("Running.........");
})