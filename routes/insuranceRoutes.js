import express from 'express';
import verifyAuthToken from "../middileware/JwtVerify.js";
import { createInsuranceLoan,getInsuranceLoan,createLoan } from '../controller/insuranceController.js';
const insuranceRouter = express.Router();
insuranceRouter.post("/create-insurance",verifyAuthToken,createInsuranceLoan);
insuranceRouter.get("/get-insurance",getInsuranceLoan);
insuranceRouter.post("/add-insurance-loan",createLoan);
export default insuranceRouter;

