import express from 'express';
import { getCarName,getCarNameByBrandId } from '../controller/carController.js';
import verifyAuthToken from "../middileware/JwtVerify.js";
const carRouter = express.Router();
carRouter.get("/get-car-name",verifyAuthToken,getCarName)
carRouter.get("/get-car-name-byBrandId",verifyAuthToken,getCarNameByBrandId)
export default carRouter;