import express from "express"
import dotenv from "dotenv"
import emailRouter from "./routers/emailRouter.js"; 


dotenv.config();
const app = express();

app.use(express.json());

app.use("/api", emailRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
