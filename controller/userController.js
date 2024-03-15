import user from "../models/user.js";
import { handleError,handleFail,handleSuccess } from "../responseHandler/response.js";
import statusCode from "../constants/statusCode.js";
import userConstantMessages from "../constants/usersConstantMessage.js";
import mongoose from "mongoose";
export const getUserDetails = async(req,res)=>{
    try {
            const getAllUser = await user.find().sort({timestamp:-1});
            const getUserCount = getAllUser.length;
            if(getAllUser)
            {
                handleSuccess(res,{getAllUser,getUserCount},userConstantMessages?.USER_DETAILS_FETCHED,statusCode?.OK)
            }
            else
            {
                handleError(res,userConstantMessages?.BLOCKED_USERS_LIST_FETCH_FAIL,statusCode?.BAD_REQUEST)
            }
    } catch (error) {
        handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}
export const userUpdateUserStatus = async(req,res)=>{
    try {   
            console.log(req.body)
            const {userId,isVerified} = req.body
            const userOId = new mongoose.Types.ObjectId(userId) 

            const updateUserStatus = await user.findOneAndUpdate({_id:userOId},{isVerified})
            if(updateUserStatus)
            {
                handleSuccess(res,updateUserStatus,userConstantMessages?.USER_UPDATED_SUCCESSFULLY,statusCode?.OK)
            }
            else
            {
                handleFail(res,userConstantMessages?.USER_UPDATED_FAIL)
            }
    } catch (error) {
        handleFail(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}