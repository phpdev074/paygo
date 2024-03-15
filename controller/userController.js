import user from "../models/user.js";
import { handleError,handleSuccess } from "../responseHandler/response.js";
import statusCode from "../constants/statusCode.js";
import userConstantMessages from "../constants/usersConstantMessage.js";
export const getUserDetails = async(req,res)=>{
    try {
            const getAllUser = await user.find()({ timestamp: -1 });
            const getUserCount = getAllUser.length;
            if(getAllUser)
            {
                handleSuccess(res,getAllUser,userConstantMessages?.USER_DETAILS_FETCHED)
            }
            else
            {
                handleError(res,userConstantMessages?.BLOCKED_USERS_LIST_FETCH_FAIL,statusCode?.BAD_REQUEST)
            }
    } catch (error) {
        handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}