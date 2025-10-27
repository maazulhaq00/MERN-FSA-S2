import express from 'express';
import * as mnController from '../controller/mnController.js';

const MnRouter = express.Router();

MnRouter.post("/", mnController.createMeal);
MnRouter.get("/user/:uid", mnController.fetchMealuserById); // move up
MnRouter.get("/", mnController.fetchMeal);
MnRouter.get("/:mid", mnController.fetchMealById);
MnRouter.put("/:mid", mnController.updateMeal);
MnRouter.delete("/:mid", mnController.deleteMeal);

export default MnRouter;
