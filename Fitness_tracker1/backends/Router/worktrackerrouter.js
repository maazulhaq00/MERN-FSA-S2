import express from 'express'
import * as tracking from '../controller/tracking.js'



const workoutrouter = express.Router()

workoutrouter.post("/", tracking.createtracker)
workoutrouter.get("/", tracking.fetchtracker)
workoutrouter.get("/:tid", tracking.fetchtrackerById)
workoutrouter.get("/user/:uid", tracking.fetchtrackerByUserId)
workoutrouter.put("/:tid", tracking.updatetracker)
workoutrouter.delete("/:tid", tracking.deletetracker)

export default workoutrouter