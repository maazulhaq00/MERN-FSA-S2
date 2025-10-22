import express from 'express'
import * as AttendeExpoRegController from '../controllers/ExpoRegisterByAttendeeController.js';
import Auth from '../middlewares/Auth.js';

const AttendeExpoRegRouter = express();

AttendeExpoRegRouter.post('/',Auth , AttendeExpoRegController.CreateAttendeeExpoReg)
AttendeExpoRegRouter.get('/',Auth , AttendeExpoRegController.GetExpoRegsForUser)
AttendeExpoRegRouter.get('/all' , AttendeExpoRegController.GetAllExpoRegs)
AttendeExpoRegRouter.put('/all/:id' , AttendeExpoRegController.updateExpoRegs)
AttendeExpoRegRouter.delete('/all/:id' , AttendeExpoRegController.deleteExpoRegs)
AttendeExpoRegRouter.get('/report' , AttendeExpoRegController.exporegestrationreport)








export default AttendeExpoRegRouter;
