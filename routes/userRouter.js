import express from 'express';
import { getUserDetails } from '../controller/userController.js';
const userRouter = express.Router();
userRouter.get("/list-user-details",getUserDetails)
export default userRouter;
