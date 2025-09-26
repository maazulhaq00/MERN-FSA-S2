import express from 'express'
import * as dotenv from 'dotenv'
import connectToDB from './config/connectToDb.js';
import categoryRouter from './routers/categoryRouter.js';
import cors from 'cors'

dotenv.config();

// create express app
const app = express();

// configure express app
app.use(cors())
app.use(express.json())

// connect to db
connectToDB();

app.get("/", (req, res) => {
    res.json({ "message": "Welcome to backend" })
})

// Category Create APIs
app.use("/categories", categoryRouter)

// Runing server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})
