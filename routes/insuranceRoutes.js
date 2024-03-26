import express from 'express';
import verifyAuthToken from "../middileware/JwtVerify.js";
import { createInsuranceLoan,getInsuranceLoan } from '../controller/insuranceController.js';
const insuranceRouter = express.Router();
insuranceRouter.post("/create-insurance",verifyAuthToken,createInsuranceLoan);
insuranceRouter.get("/get-insurance",getInsuranceLoan);
export default insuranceRouter;

