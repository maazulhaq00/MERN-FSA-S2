import express from 'express'
import  * as progresstrackconroller from '../controller/progresstrackcontroller.js'



const progressrouter = express.Router()

progressrouter.post("/" , progresstrackconroller.createprogresstracker)
progressrouter.get("/" , progresstrackconroller.fetchprogresstracker)
progressrouter.get("/:ptid", progresstrackconroller.fetchprogresstrackerById)
progressrouter.get("/user/:uid", progresstrackconroller.fetchprogresstrackerByUserId)
progressrouter.put("/:ptid", progresstrackconroller.updateprogresstracker)
progressrouter.delete("/:ptid", progresstrackconroller.deleteprogresstracker)

export default progressrouter