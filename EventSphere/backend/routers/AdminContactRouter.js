import express from 'express';
import {
  sendMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
} from '../controllers/AdminContactController.js'

const AdminContactrouter = express.Router();

AdminContactrouter.post('/send', sendMessage);
AdminContactrouter.get('/all', getAllMessages);
AdminContactrouter.get('/:id', getMessageById);
AdminContactrouter.put('/:id', markAsRead);
AdminContactrouter.delete('/:id', deleteMessage);

export default AdminContactrouter;
