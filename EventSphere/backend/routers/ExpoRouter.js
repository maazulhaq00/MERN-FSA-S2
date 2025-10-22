import express from 'express'
import * as ExpoController from '../controllers/ExpoController.js'
import upload from '../middlewares/MulterSetup.js';
const ExpoRouter = express();

ExpoRouter.post('/', upload.single('expoimage'), ExpoController.createExpo)
ExpoRouter.get('/', ExpoController.fetchExpos)
ExpoRouter.get('/:id', ExpoController.fetchExpo)
ExpoRouter.put('/:id', upload.single('expoimage'), ExpoController.updateExpo)
ExpoRouter.delete('/:id', ExpoController.deleteExpo)



export default ExpoRouter;
