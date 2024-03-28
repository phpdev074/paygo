import mongoose from "mongoose";
import { handleError,handleFail,handleSuccess } from "../responseHandler/response.js";
import statusCode from "../constants/statusCode.js";
import InsuranceLoan from "../models/insuranceLoanSchema.js";  
import Loan from "../models/financialLoan.js";
export const createInsuranceLoan = async(req,res)=>{
    try {
            const userId = req.user
            const userOId = new mongoose.Types.ObjectId(userId)
            const {vehicleName,vehicleBrand,vehicleModel,color,licensePlateNo,vehicleYear,ownerId,agentPhoneNumber,agentCode,agentApp,fuelType,vehicleValue,carCondition,loanTerm,vehicleRegistrationNo,registrationDate,recordedMilage,bankName,bankAccountNumber,insuranceCompany,drivingLicenceImage,formFilledBy,employmentAddress,applicationDate,vehicleLibre,libreFrontPic,libreBackPic,engineNo,vehiclePhoto} = req.body
            const createInsuranceLoans = await InsuranceLoan.create({userId:userOId,vehicleName,vehicleBrand,vehicleModel,color,agentPhoneNumber,agentCode,agentApp,licensePlateNo,vehicleYear,ownerId:userOId,fuelType,vehicleValue,carCondition,loanTerm,vehicleRegistrationNo,registrationDate,recordedMilage,bankName,bankAccountNumber,insuranceCompany,drivingLicenceImage,formFilledBy,employmentAddress,applicationDate,vehicleLibre,libreFrontPic,libreBackPic,engineNo,vehiclePhoto})
            if(createInsuranceLoans)
            {   
                //hanling the data 
                handleSuccess(res,createInsuranceLoans,'You veichle Insurance created successfully',statusCode?.OK)
            }
            else
            {
                handleError(res,'You veichle Insurance fail',statusCode?.BAD_REQUEST)
            }
    } catch (error) {
        handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}
export const getInsuranceLoan = async(req,res)=>{
    try {
            const insuranceLoanList = await InsuranceLoan.find().populate("userId").sort({_id:-1})
            if(insuranceLoanList)
            {
                console.log("====>>>>",insuranceLoanList)
                handleSuccess(res,insuranceLoanList,"Insurance Loan List fetched successfully",statusCode?.OK) 
            }
            else
            {
                handleError(res,"Insurance Loan List Fail",statusCode?.BAD_REQUEST)
            }
    } catch (error) {
       handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR) 
    }
}
export const createLoan = async(req,res)=>{
    try {
            const userId = req.user
            const userOId = new mongoose.Types.ObjectId(userId)  
            const {loanTerms,uploadid,loanType,collateral,collateralValueApprovedBy,address,applicationDate,employementAddress,uplaodIdImage,tinRegistrationImage,businessLicenseImage,idNumber,companyName,loanTerm,loanAmount,reasonForLoan,bankName,tinNumber,accountNumber} = req.body
            const loanCreate = await Loan.create({loanTerms,uploadid,loanType,collateral,collateralValueApprovedBy,address,applicationDate,employementAddress,uplaodIdImage,tinRegistrationImage,businessLicenseImage,idNumber,companyName,loanTerm,loanAmount,reasonForLoan,bankName,tinNumber,accountNumber,userId:userOId})
            if(loanCreate)
            {
                handleSuccess(res,loanCreate,"Insurance Loan Craeted Succesfully",statusCode?.OK)
            }
            else
            {
                handleError(res,"Insurance Loan created fail",statusCode?.BAD_REQUEST)
            }
    } catch (error) {
        handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)                
    }
}