import express from 'express';
import { getUserDetails,userUpdateUserStatus } from '../controller/userController.js';
const userRouter = express.Router();
userRouter.get("/list-user-details",getUserDetails)
userRouter.put("/update-user-status",userUpdateUserStatus)
export default userRouter;
