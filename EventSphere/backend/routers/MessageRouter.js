import express from 'express';
import {
  sendMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
} from '../controllers/MessageController.js';

const router = express.Router();

router.post('/send', sendMessage);
router.get('/all', getAllMessages);
router.get('/:id', getMessageById);
router.put('/:id', markAsRead);
router.delete('/:id', deleteMessage);

export default router;
