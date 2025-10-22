import express from 'express'
import * as userController from '../controllers/UserController.js';
import upload from '../middlewares/MulterSetup.js';
import Auth from '../middlewares/Auth.js';
import { getNeighboringExhibitors } from '../controllers/UserController.js';
const userRouter = express();

userRouter.post('/regestration',  upload.single('image'), userController.regestration)
userRouter.post('/login', userController.login)
userRouter.get('/users', userController.fetchUsers)
userRouter.delete('/users/:id', userController.deleteUser)
userRouter.put('/updateuser', Auth , upload.single('image'), userController.updateUser)
userRouter.put('/changepassword', Auth ,  userController.changePassword)
userRouter.put('/forgotpassword' ,  userController.forgotPassword)
userRouter.get('/users/neighboring/:userId', getNeighboringExhibitors);



export default userRouter;
