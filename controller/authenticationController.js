import bcrypt from "bcrypt";
import user from "../models/user.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { s3Client } from "../Helpers/AwsConfig.js";
import userConstantMessages from "../constants/usersConstantMessage.js";
import {
  handleSuccess,
  handleFail,
  handleError,
} from "../responseHandler/response.js";
import statusCode from "../constants/statusCode.js";
export const checkUserEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserEmail = await user.findOne({ email });
    if (checkUserEmail) {
      return res.status(statusCode.OK).json({ userExist: true, message: "This user already exists" });
    } else {
      return res.status(statusCode.OK).json({ userExist: false, message: "This email does not exist" });
    }
  } catch (error) {
    handleError(res, error.message, statusCode.INTERNAL_SERVER_ERROR);
  }
};
export const signUp = async (req, res) => {
  try {
    let userRecord = {};
    let newAddress = {};
    let familyRecord = {};
    let identificationCardData = {};
    let documentData = {};
    const missingFields = [];
    const {
      name,
      email,
      phoneNumber,
      image,
      countryCode,
      gender,
      dateOfBirth,
      birthPlace,
      nationality,
      educationStatus,
      password,
    } = req.body;
    const fildExistingUserData = await user
      .findOne({ email })
      .select("-password");
    if (fildExistingUserData) {
      handleError(
        res,
        userConstantMessages?.EMAIL_ALREADY_EXIST,
        statusCode?.BAD_REQUEST
      );
    } else {
      if (!name) missingFields.push("name");
      if (!email) missingFields.push("email");
      if (!phoneNumber) missingFields.push("phoneNumber");
      if (!countryCode) missingFields.push("countryCode");
      if (!gender) missingFields.push("gender");
      if (!image) missingFields.push("image");
      if (!dateOfBirth) missingFields.push("dateOfBirth");
      if (!birthPlace) missingFields.push("birthPlace");
      if (!nationality) missingFields.push("nationality");
      if (!educationStatus) missingFields.push("educationStatus");
      if (!password) missingFields.push("password");
      if (missingFields.length > 0) {
        const errorMessage = `Missing required fields: ${missingFields.join(
          ", "
        )}`;
        handleFail(res, errorMessage, statusCode?.BAD_REQUEST);
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        userRecord = {
          name,
          email,
          phoneNumber,
          countryCode,
          gender,
          image,
          dateOfBirth,
          birthPlace,
          nationality,
          educationStatus,
          password: hashedPassword,
        };
        console.log(userRecord)
      }
      const {
        fName,
        mName,
        gFName,
        gMName,
        maritalStatus,
        fullNameOfSpouse,
        totalFamilyNumber,
        totalMaleNumber,
        totalFemaleNumber,
      } = req.body;
      if (!fName) missingFields.push("fName");
      if (!mName) missingFields.push("mName");
      if (!gFName) missingFields.push("gFName");
      if (!gMName) missingFields.push("gMName");
      if (!maritalStatus) missingFields.push("maritalStatus");
      if (!fullNameOfSpouse) missingFields.push("fullNameOfSpouse");
      if (!totalFamilyNumber) missingFields.push("totalFamilyNumber");
      if (!totalMaleNumber) missingFields.push("totalMaleNumber");
      if (!totalFemaleNumber) missingFields.push("totalFemaleNumber");
      if (missingFields.length > 0) {
        const errorMessage = `Required fields are missing: ${missingFields.join(
          ", "
        )}`;
        return res.status(400).json({ message: errorMessage });
      } else {
        familyRecord = {
          fName,
          mName,
          gFName,
          gMName,
          maritalStatus,
          fullNameOfSpouse,
          totalFamilyNumber,
          totalMaleNumber,
          totalFemaleNumber,
        };
      }
      const {
        country,
        currentAddress,
        region,
        zone,
        city,
        subCity,
        woreda,
        houseNumber,
        landlineNumber,
      } = req.body;
      if (!country) missingFields.push("country");
      if (!currentAddress) missingFields.push("currentAddress");
      if (!region) missingFields.push("region");
      if (!zone) missingFields.push("zone");
      if (!city) missingFields.push("city");
      if (!subCity) missingFields.push("subCity");
      if (!woreda) missingFields.push("woreda");
      if (!houseNumber) missingFields.push("houseNumber");
      if (!landlineNumber) missingFields.push("landlineNumber");
      if (missingFields.length > 0) {
        const errorMessage = `Required fields are missing: ${missingFields.join(
          ", "
        )}`;
        return res.status(400).json({ message: errorMessage });
      } else {
        newAddress = {
          country,
          currentAddress,
          region,
          zone,
          city,
          subCity,
          woreda,
          houseNumber,
          landlineNumber,
        };
      }
      const {
        typeOfIdentificationCard,
        idNumber,
        occupationalStatus,
        incomeNature,
      } = req.body;
      if (!typeOfIdentificationCard)
        missingFields.push("typeOfIdentificationCard");
      if (!idNumber) missingFields.push("idNumber");
      if (!occupationalStatus) missingFields.push("occupationalStatus");
      if (!incomeNature) missingFields.push("incomeNature");
      if (missingFields.length > 0) {
        const errorMessage = `Required fields are missing: ${missingFields.join(
          ", "
        )}`;
        handleError(res, errorMessage, statusCode?.BAD_REQUEST);
      } else {
        identificationCardData = {
          typeOfIdentificationCard,
          idNumber,
          occupationalStatus,
          incomeNature,
        };
      }
      const { facialPicture, identificationCard } = req.body;
      if (!facialPicture) missingFields.push("facialPicture");
      if (!identificationCard) missingFields.push("identificationCard");
      if (missingFields.length > 0) {
        const errorMessage = `Required fields are missing: ${missingFields.join(
          ", "
        )}`;
        handleFail(res, errorMessage, statusCode?.BAD_REQUEST);
      } else {
        documentData = {
          facialPicture,
          identificationCard,
        };
        const userData = req.body        
        const createUserData = await user.create(req.body);
        handleSuccess(
          res,
          {
            createUserData
          },
          userConstantMessages?.USER_REGISTERED,
          statusCode?.OK
        );
      }
    }
  } catch (error) {
    handleError(res, error.message, statusCode?.INTERNAL_SERVER_ERROR);
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const image = req.files.image;
    console.log("=====>>>imagename", image);
    const imageName = `${uuidv4()}_${image.name}`;
    const bucketParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageName,
      Body: image.data,
      ContentType: image.mimetype,
    };
    console.log("=====>>>>>>>", bucketParams);
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
export const login = async (req, res) => {
  try {
    const {email,phoneNumber,password} = req.body
    const userData = await user.findOne({$or: [{ email }, { phoneNumber }] })
    const loggedInUser = await user.findOne({$or: [{ email }, { phoneNumber }] }).select("-password")
    if(userData?.isVerified == true)
    {
      loggedInUser = await user.findOne({ $or: [{ email }, { phoneNumber }] }).select("-password");
      if (!userData) {
        handleError(
          res,
          userConstantMessages?.USER_NOT_FOUND,
          statusCode?.BAD_REQUEST
        );
      } else {
        if (!userData || !(await bcrypt.compare(password, userData?.password))) {
          handleError(res, "Invalid Email or password", statusCode?.BAD_REQUEST);
        } else {
          const token = jwt.sign(
            { userId: userData._id, userEmail: userData.email },
            process.env.SECRET_KEY
          );
  
          handleSuccess(
            res,
            { token: token,isVerifiedByAdmin:userData?.isVerified,loggedInUser },
            "User login successful",
            statusCode?.OK
          );
        }
      }
    }
    else if(userData?.isVerified == false){
      handleSuccess(res,{ token: "",isVerifiedByAdmin:userData?.isVerified,loggedInUser },"Admin is not verified",statusCode?.OK)
    }
    else
    {
      handleFail(res,"User not found",statusCode?.OK)
    }
   
  } catch (err) {
    console.error(err);``
    handleError(res, err.message, statusCode?.INTERNAL_SERVER_ERROR);
  }
};
export const loginFromIos = async(req,res)=>{
  try {
    const obj = req.body
    console.log("========>>>>>>>>req.body",req.body)
    const innerString = Object.keys(obj)[0];
    const innerObject = JSON.parse(innerString);
    const { email, password } = innerObject;
    console.log(email,password)
    const userData = await user.findOne({ email })
    const loggedInUser = await user.findOne({email}).select("-password")
    if (!userData) {
      handleError(
        res,
        userConstantMessages?.USER_NOT_FOUND,
        statusCode?.BAD_REQUEST
      );
    } else {
      if (!userData || !(await bcrypt.compare(password, userData?.password))) {
        handleError(res, "Invalid Email or password", statusCode?.BAD_REQUEST);
      } else {
        const token = jwt.sign(
          { userId: userData._id, userEmail: userData.email },
          process.env.SECRET_KEY
        );

        handleSuccess(
          res,
          { token: token,isVerifiedByAdmin:userData?.isVerified,loggedInUser },
          "User login successful",
          statusCode?.OK
        );
      }
    }
  } catch (err) {
    console.error(err);
    handleError(res, err.message, statusCode?.INTERNAL_SERVER_ERROR);
  }
}
