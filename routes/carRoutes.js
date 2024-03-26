import express from 'express';
import { getBrandName,getCarNameByBrandId } from '../controller/carController.js';
import verifyAuthToken from "../middileware/JwtVerify.js";
const carRouter = express.Router();
carRouter.get("/get-brand-name",verifyAuthToken,getBrandName)
carRouter.get("/get-car-name-byBrandId",verifyAuthToken,getCarNameByBrandId)
export default carRouter;