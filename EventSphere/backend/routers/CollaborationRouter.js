import express from 'express';
import {
  sendMessage,
  getMessagesBetweenUsers,
  markAsRead,
  deleteMessage
} from '../controllers/CollaborationmessageController.js';

const router = express.Router();


router.get('/', (req, res) => {
  res.send("Collaboration API is working ");
});

router.post('/send', sendMessage);
router.get('/between/:senderId/:receiverId', getMessagesBetweenUsers);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);

export default router;
