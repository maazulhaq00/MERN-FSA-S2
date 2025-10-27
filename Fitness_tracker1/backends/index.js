import express from 'express';
import dotenv from "dotenv";
import connection from "./connection/connect.js";
import userrouter from "./Router/userrouter.js";
import workoutrouter from "./Router/worktrackerrouter.js";
import workcategoryssrouter from "./Router/workcatrouter.js";
import progressrouter from "./Router/progresstrack.js";
import MnRouter from './Router/mnRouter.js';
import mealRouter from './Router/mealRouter.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

connection();

app.use("/", userrouter);
app.use("/workouttraking", workoutrouter);
app.use("/categoryw", workcategoryssrouter);
app.use("/progresstrack", progressrouter);
app.use('/meals', MnRouter);
app.use('/mealstypes', mealRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
