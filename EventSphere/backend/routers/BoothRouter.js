import express from 'express';
import {
  createBooth,
  fetchBooths,
  fetchBooth,
  updateBooth,
  deleteBooth,
  getAvailableBoothDetails,
  filterBooths,
  getBoothsByExpo,
  reserveBooth,
  updateBoothDetails,     
  getBoothDetails        
} from '../controllers/BoothController.js';

const BoothRouter = express.Router(); 

// Existing routes
BoothRouter.post('/', createBooth);
BoothRouter.get('/', fetchBooths);
BoothRouter.get('/:id', fetchBooth);
BoothRouter.put('/:id', updateBooth);
BoothRouter.delete('/:id', deleteBooth);
BoothRouter.get('/filter/options', getAvailableBoothDetails);
BoothRouter.get('/filter', filterBooths);
BoothRouter.get('/byexpo/:expoId', getBoothsByExpo);
BoothRouter.post('/reserve', reserveBooth);
BoothRouter.put('/details/:boothId', updateBoothDetails);
BoothRouter.get('/details/:boothId', getBoothDetails);

export default BoothRouter;
