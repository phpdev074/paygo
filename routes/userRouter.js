import express from 'express';
import { getUserDetails,userUpdateUserStatus,getUserProfile,editUserProfile,changePassword } from '../controller/userController.js';
import verifyAuthToken from "../middileware/JwtVerify.js";
const userRouter = express.Router();
userRouter.get("/list-user-details",getUserDetails)
userRouter.put("/update-user-status",userUpdateUserStatus)
userRouter.get("/get-user-profile",verifyAuthToken,getUserProfile)
userRouter.put("/edit-user-profile",verifyAuthToken,editUserProfile)
userRouter.put("/change-password",verifyAuthToken,changePassword)
export default userRouter;
