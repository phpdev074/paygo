import express from 'express';
import verifyAuthToken from "../middileware/JwtVerify.js";
import { createInsuranceLoan } from '../controller/insuranceController.js';
const insuranceRouter = express.Router();
insuranceRouter.post("/create-insurance",verifyAuthToken,createInsuranceLoan);
export default insuranceRouter;

