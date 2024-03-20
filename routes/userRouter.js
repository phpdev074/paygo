import express from 'express';
import { getUserDetails,userUpdateUserStatus,getUserProfile } from '../controller/userController.js';
const userRouter = express.Router();
userRouter.get("/list-user-details",getUserDetails)
userRouter.put("/update-user-status",userUpdateUserStatus)
userRouter.get("/get-user-profile",getUserProfile)
export default userRouter;
