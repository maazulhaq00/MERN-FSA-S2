import express from 'express';
import * as AttendeeScheduleRegController from '../controllers/ScheduleegController.js';
import Auth from '../middlewares/Auth.js';


const AttendeeScheduleRegRouter = express();


AttendeeScheduleRegRouter.post('/', Auth,AttendeeScheduleRegController.CreateAttendeeScheduleReg);
AttendeeScheduleRegRouter.get('/', Auth, AttendeeScheduleRegController.GetScheduleRegsForUser);
AttendeeScheduleRegRouter.get('/all', AttendeeScheduleRegController.GetAllScheduleRegs);
AttendeeScheduleRegRouter.put('/all/:id', AttendeeScheduleRegController.updateScheduleRegs);
AttendeeScheduleRegRouter.delete('/all/:id', AttendeeScheduleRegController.deleteScheduleRegs);
AttendeeScheduleRegRouter.get('/report', AttendeeScheduleRegController.scheduleRegistrationReport);

export default AttendeeScheduleRegRouter;
