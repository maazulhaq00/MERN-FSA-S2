import express from 'express'
import * as ScheduleController from '../controllers/ScheduleController.js'
const ScheduleRouter = express();

ScheduleRouter.post('/', ScheduleController.createSchedule)
ScheduleRouter.get('/', ScheduleController.fetchSchedules)
ScheduleRouter.get('/:id', ScheduleController.fetchSchedule)
ScheduleRouter.put('/:id', ScheduleController.updateSchedule)
ScheduleRouter.delete('/:id', ScheduleController.deleteSchedule)



export default ScheduleRouter;
