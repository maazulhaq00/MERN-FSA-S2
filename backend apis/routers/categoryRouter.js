import express from 'express'
import * as categoryController from '../controllers/categoryController.js'


const categoryRouter = express.Router()


categoryRouter.post("/", categoryController.createCategory)
categoryRouter.get("/", categoryController.fetchCategories)
categoryRouter.get("/:id", categoryController.fetchCategory)
categoryRouter.put("/:id", categoryController.updateCategory)
categoryRouter.delete("/:id", categoryController.deleteCategory)


export default categoryRouter;