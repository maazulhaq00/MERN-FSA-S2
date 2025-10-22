import express from 'express'
import * as dotenv from 'dotenv'
import connectToDB from './config/connectToDb.js';
import categoryRouter from './routers/categoryRouter.js';
import cors from 'cors'
import productRouter from './routers/productRouter.js';
import authRouter from './routers/authRouter.js';

dotenv.config();

// create express app
const app = express();

// configure express app
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// connect to db
connectToDB();

app.get("/", (req, res) => {
    res.json({ "message": "Welcome to backend" })
})

app.use(authRouter)
app.use("/categories", categoryRouter)
app.use("/products", productRouter)

// Runing server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})
