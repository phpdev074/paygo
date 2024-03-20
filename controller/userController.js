import mongoose from "mongoose";
import bcrypt from "bcrypt";
import user from "../models/user.js";
import { handleError,handleFail,handleSuccess } from "../responseHandler/response.js";
import statusCode from "../constants/statusCode.js";
import userConstantMessages from "../constants/usersConstantMessage.js";
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
                handleError(res,userConstantMessages?.USER_DETAILS_FETCHED_FAIL,statusCode?.BAD_REQUEST)
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
export const getUserProfile = async(req,res)=>{
    try {
            const userId = req.user
            const userOId= new mongoose.Types.ObjectId(userId)
            const getUserProfile= await user.findOne({_id:userOId})
            if(getUserProfile) 
            {
                handleSuccess(res,getUserProfile,"User profile fetched SuccessFully",statusCode?.OK)
            }
            else
            {
                handleError(res,"User Profile fetch Failed",statusCode?.BAD_REQUEST)
            }
    } catch (error) {
        handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}
export const changePassword = async(req,res)=>{
    try {
        const userId = req.user
        const userOId = new mongoose.Types.ObjectId(userId)
        const userData = await user.findById({_id:userOId});
        console.log("=========>>>>",userData)
        const {oldPassword,newPassword} = req.body
        console.log(oldPassword,newPassword)
        const checkPassword = await bcrypt.compare(oldPassword, userData?.password)
        console.timeLog(checkPassword)
        if(checkPassword)
        {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            let updatePassword = await user.findOneAndUpdate({_id:userOId},{password:hashedPassword})
            console.log("======>>>>",updatePassword)
            handleSuccess(res,"","Password updated successFully",statusCode?.OK)
        }
        else
        {
            handleError(res,"Old Password is not correct",statusCode?.BAD_REQUEST)
        }
    } catch (error) {
        handleError(res,error?.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}
export const editUserProfile = async(req,res)=>{
    try {
            const userId = req.user
            console.log(req.body)
            const userOId = new mongoose.Types.ObjectId(userId)
            const {
                name,
                email,
                image,
                phoneNumber,
                countryCode,
                gender,
                dateOfBirth,
                birthPlace,
                nationality,
                educationStatus,
                password,
                country,
                currentAddress,
                region,
                zone,
                city,
                subCity,
                woreda,
                houseNumber,
                landlineNumber,
                facialPicture,
                identificationCard,
                fName,
                mName,
                gFName,
                gMName,
                maritalStatus,
                fullNameOfSpouse,
                totalFamilyNumber,
                totalMaleNumber,
                totalFemaleNumber,
                typeOfIdentificationCard,
                idNumber,
                occupationalStatus,
                incomeNature
              } = req.body;
            const userData = await user.findById({_id:userOId}).select("-password");
            if (name) userData.name = name;
            if (email) userData.email = email;
            if (image) userData.image = image;
            if (phoneNumber) userData.phoneNumber = phoneNumber;
            if (countryCode) userData.countryCode = countryCode;
            if (gender) userData.gender = gender;
            if (dateOfBirth) userData.dateOfBirth = dateOfBirth;
            if (birthPlace) userData.birthPlace = birthPlace;
            if (nationality) userData.nationality = nationality;
            if (educationStatus) userData.educationStatus = educationStatus;
            if (password) userData.password = password;
            if (country) userData.country = country;
            if (currentAddress) userData.currentAddress = currentAddress;
            if (region) userData.region = region;
            if (zone) userData.zone = zone;
            if (city) userData.city = city;
            if (subCity) userData.subCity = subCity;
            if (woreda) userData.woreda = woreda;
            if (houseNumber) userData.houseNumber = houseNumber;
            if (landlineNumber) userData.landlineNumber = landlineNumber;
            if (facialPicture) userData.facialPicture = facialPicture;
            if (identificationCard) userData.identificationCard = identificationCard;
            if (fName) userData.fName = fName;
            if (mName) userData.mName = mName;
            if (gFName) userData.gFName = gFName;
            if (gMName) userData.gMName = gMName;
            if (maritalStatus) userData.maritalStatus = maritalStatus;
            if (fullNameOfSpouse) userData.fullNameOfSpouse = fullNameOfSpouse;
            if (totalFamilyNumber) userData.totalFamilyNumber = totalFamilyNumber;
            if (totalMaleNumber) userData.totalMaleNumber = totalMaleNumber;
            if (totalFemaleNumber) userData.totalFemaleNumber = totalFemaleNumber;
            if (typeOfIdentificationCard) userData.typeOfIdentificationCard = typeOfIdentificationCard;
            if (idNumber) userData.idNumber = idNumber;
            if (occupationalStatus) userData.occupationalStatus = occupationalStatus;
            if (incomeNature) userData.incomeNature = incomeNature;
            await userData.save();

            if(userData) 
            {
                handleSuccess(res, userData,"User profile updated SuccessFully",statusCode?.OK)
            }
            else
            {
                handleError(res,"User Profile update Failed",statusCode?.BAD_REQUEST)
            }
    } catch (error) {
        handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
    }
}