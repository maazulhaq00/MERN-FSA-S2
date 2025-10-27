import express from 'express';
import * as mealtypController from '../controller/mealtypController.js';


const mealRouter = express.Router();

mealRouter.post('/', mealtypController.createMealtype)
mealRouter.get('/', mealtypController.fetchMealtype)
mealRouter.get('/:id', mealtypController.fetchMealtypeById)
mealRouter.put('/:id', mealtypController.updateMealtype)
mealRouter.delete('/:id', mealtypController.deleteMealtype)

export default mealRouter;