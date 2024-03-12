import bcrypt from "bcrypt";
import user from "../models/user.js";
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
            const { address, country, countryAddress, region, zone, city, subCity, woreda, houseNumber, landlineNumber } = req.body;
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

                    }
                  }
                  else
                  {

                  }
              }
              else
              {

              }
         }
          else
          {}
    }
    else{

    }
  } catch (error) {
    console.log(error.message)
  }
};
