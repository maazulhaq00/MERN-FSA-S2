import express from 'express'
import * as BoothassignController from '../controllers/BoothassignController.js';
const BoothassignRouter = express();

BoothassignRouter.post('/', BoothassignController.createBoothAssignment)
BoothassignRouter.get('/', BoothassignController.fecthBoothAssignments)
BoothassignRouter.get('/:id', BoothassignController.fetchBoothAssignment)
BoothassignRouter.put('/:id', BoothassignController.updateBoothAssignment)
BoothassignRouter.delete('/:id', BoothassignController.deleteBoothAssignment)



export default BoothassignRouter;
