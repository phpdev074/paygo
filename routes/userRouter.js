import express from 'express';
import { getUserDetails,userUpdateUserStatus,getUserProfile,updateNotification,editUserProfile,changePassword,deleteAccount } from '../controller/userController.js';
import verifyAuthToken from "../middileware/JwtVerify.js";
const userRouter = express.Router();
userRouter.get("/list-user-details",getUserDetails)
userRouter.put("/update-user-status",userUpdateUserStatus)
userRouter.get("/get-user-profile",verifyAuthToken,getUserProfile)
userRouter.put("/edit-user-profile",verifyAuthToken,editUserProfile)
userRouter.put("/change-password",verifyAuthToken,changePassword)
userRouter.delete("/delete-user",verifyAuthToken,deleteAccount)
userRouter.put("/notification",verifyAuthToken,updateNotification)
export default userRouter;

