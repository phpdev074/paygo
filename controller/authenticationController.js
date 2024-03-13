import bcrypt from "bcrypt";
import user from "../models/user.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { s3Client } from "../Helpers/AwsConfig.js";
import identificationSchema from "../models/identificationSchema.js";
import familyMember from "../models/familyMember.js";
import addressSchema from "../models/addressSchema.js";
import documentationSchema from "../models/documentationSchema.js";
import { handleSuccess,handleFail,handleError } from "../responseHandler/response.js";
import statusCode from "../constants/statusCode.js";
export const signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      countryCode,
      gender,
      dateOfBirth,
      birthPlace,
      nationality,
      educationStatus,
      password,
    } = req.body;
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userRecord = {
      name,
      email,
      phoneNumber,
      countryCode,
      gender,
      dateOfBirth,
      birthPlace,
      nationality,
      educationStatus,
      password: hashedPassword, 
    };
    const createUserData = await user.create(userRecord)
    if(createUserData)
    {
        const { fName, mName, gFName, gMName, maritalStatus, fullNameOfSpouse, totalFamilyNumber, totalMaleNumber, totalFemaleNumber } = req.body;
        const newFamilyMember={
            fName,
            mName,
            gFName,
            gMName,
            maritalStatus,
            fullNameOfSpouse,
            totalFamilyNumber,
            totalMaleNumber,
            totalFemaleNumber,
            userId:createUserData?._id
          };
          const newNewFamilyMemberData = await familyMember.create(newFamilyMember)
          if(newNewFamilyMemberData)
          {
            const { country, currentAddress, region, zone, city, subCity, woreda, houseNumber, landlineNumber } = req.body;
            const newAddress ={
                address,
                country,
                countryAddress,
                region,
                zone,
                city,
                subCity,
                woreda,
                houseNumber,
                landlineNumber,
                userId:createUserData?._id
              };
              const createNewAddress = await addressSchema.create(newAddress)
              if(createNewAddress)
              {
                const { typeOfIdentificationCard, idNumber, occupationalStatus, incomeNature } = req.body;
                const newIdentification = {
                    typeOfIdentificationCard,
                    idNumber,
                    occupationalStatus,
                    incomeNature,
                    userId:createUserData?._id
                  };
                  const createIdentification = await identificationSchema(newIdentification)
                  if(createIdentification)
                  {
                    const { facialPicture, identificationCard } = req.body;
                    const newDocumentation ={
                      userId:createUserData?._id,
                      facialPicture,
                      identificationCard
                    }
                    const createDocumentation = await documentationSchema.create(newDocumentation)
                    if(createDocumentation)
                    {
                        handleSuccess(res,{createUserData,newNewFamilyMemberData,createNewAddress,createIdentification},"You have signed up successfully",statusCode?.OK)
                    }
                    else
                    {
                        handleError(res,"Signup failed",statusCode?.BAD_REQUEST)
                    }
                  }
                  else
                  {
                    handleFail(res,"some thing went wrong while creating the identification",statusCode?.BAD_REQUEST)
                  }
              }
              else
              {
                handleFail(res,"somethingwent wrong while creating  address",statusCode?.BAD_REQUEST)
              }
         }
          else
          {
            handleError(res,'something gone wrong while entering user data',statusCode?.BAD_REQUEST)
          }
    }
    else{

    }
  } catch (error) {
    console.log(error.message)
    handleError(res,error.message,statusCode?.INTERNAL_SERVER_ERROR)
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const image = req.files.image;
    console.log("=====>>>imagename",image)
    const imageName = `${uuidv4()}_${image.name}`;
    const bucketParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageName,
      Body: image.data,
      ContentType: image.mimetype,
    };
    console.log("=====>>>>>>>",bucketParams)
    const uploadCommand = new PutObjectCommand(bucketParams);
    const data = await s3Client.send(uploadCommand);

    const accessibleUrl = `https://${bucketParams.Bucket}.s3.${process.env.REGION}.amazonaws.com/${imageName}`;

    return res.status(statusCode?.OK).json({
      status: statusCode?.OK,
      message: "Image uploaded successfully",
      filename: accessibleUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
};