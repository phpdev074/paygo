import express from 'express';
import { getBrandName,getCarNameByBrandId,addBrandName,getCarNameByBrand } from '../controller/carController.js';
import verifyAuthToken from "../middileware/JwtVerify.js";
const carRouter = express.Router();
carRouter.post("/add-brand",addBrandName)
carRouter.get("/get-brand-name",getBrandName)
carRouter.get("/get-car-name-byBrandId",getCarNameByBrandId)
carRouter.get("/get-car-name",getCarNameByBrand)
export default carRouter;