import express from 'express';
import {
  createApplication,
  getAllApplications,
} from '../controllers/ApplicationController.js';
import Auth from '../middlewares/Auth.js';

const router = express.Router();

// Routes
router.post('/', Auth, createApplication); 
router.get('/', getAllApplications);  
export default router;