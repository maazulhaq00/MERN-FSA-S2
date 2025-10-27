import express from 'express'
import * as workcategory from '../controller/workcategory.js'



const workcategoryssrouter = express.Router()

workcategoryssrouter.post("/" , workcategory.createcategory)
workcategoryssrouter.get("/" , workcategory.fetchcategory)
workcategoryssrouter.get("/:tid", workcategory.fetchcategoryById)
workcategoryssrouter.put("/:tid", workcategory.updatecategory)
workcategoryssrouter.delete("/:tid", workcategory.deletecategory)

export default workcategoryssrouter