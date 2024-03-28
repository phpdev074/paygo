import mongoose from "mongoose";
import BrandName from "../models/brandNameSchema.js";
import CarName from "../models/carNameSchema.js";
import {
    handleSuccess,
    handleFail,
    handleError,
  } from "../responseHandler/response.js";
  import statusCode from "../constants/statusCode.js";
export const addBrandName = async(req,res)=>{
    try {
            const {name} = req.body
            const addBrand = await BrandName.create({name})
            if(addBrand)
            {
                handleSuccess(res,addBrand,'Brand Added Successfully',statusCode?.OK)
            }
            else{
                handleFail(res,'Brand Added Fail',statusCode?.BAD_REQUEST)
            }
    } catch (error) {
        handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}
export const getBrandName = async(req,res)=>{
    try {
            const getCarName = await BrandName.find()
            if(getCarName)
            {
                handleSuccess(res,getCarName,"Brand Details Fetch Successfully",statusCode?.OK)
            }
            else
            {
                handleFail(res,"Brand Details fetch fail",statusCode?.CREATED)
            }
    } catch (error) {
        handleFail(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}
export const getCarNameByBrandId = async (req, res) => {
    try {
        const id = req.query.id;
        const brandOId = new mongoose.Types.ObjectId(id);
        const getCarNames = await CarName.find({ brandId: brandOId });
        if (getCarNames.length > 0) {
            handleSuccess(res, getCarNames, "List Fetched successfully", statusCode.OK);
        } else {
            handleFail(res, "No car names found for the given brand ID", statusCode.NOT_FOUND);
        }
    } catch (error) {
        handleError(res, error.message, statusCode.INTERNAL_SERVER_ERROR);
    }
};
export const getCarNameByBrand = async (req, res) => {
    try {
        const id = req.query.id;
        const brandOId = new mongoose.Types.ObjectId(id);
        const getCarNames = await CarName.find().populate("brandId");
        if (getCarNames.length > 0) {
            handleSuccess(res, getCarNames, "List Fetched successfully", statusCode.OK);
        } else {
            handleFail(res, "No car names found for the given brand ID", statusCode.NOT_FOUND);
        }
    } catch (error) {
        handleError(res, error.message, statusCode.INTERNAL_SERVER_ERROR);
    }
};