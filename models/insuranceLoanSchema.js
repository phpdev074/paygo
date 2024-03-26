import mongoose from "mongoose";

const insuranceLoanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleName: {
      type: String,
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    licensePlateNo: {
      type: String,
      required: true,
    },
    vehicleYear: {
      type: Number,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    agentPhoneNumber:{
      type:String
    },
    agentCode:{
      type:String
    },
    agentApp:{
      type:String
    },
    fuelType: {
      type: String,
      required: true,
    },
    vehicleValue: {
      type: Number,
      required: true,
    },
    carCondition: {
      type: String,
      required: true,
    },
    loanTerm: {
      type: String,
      required: true,
    },
    vehicleRegistrationNo: {
      type: String,
      required: true,
    },
    registrationDate: {
      type: Date,
      required: true,
    },
    recordedMilage: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    bankAccountNumber: {
      type: String,
      required: true,
    },
    insuranceCompany: {
      type: String,
      required: true,
    },
    drivingLicenceImage: {
      type: String,
      required: true,
    },
    vehicleLibre: {
      type: String,
      required: true,
    },
    libreFrontPic: {
      type: String,
      required: true,
    },
    libreBackPic: {
      type: String,
      required: true,
    },
    vehiclePhoto: {
      type: String,
      required: true,
    },
    engineNo: {
      type: String,
      required: true,
    },
    formFilledBy: {
      type: String,
      required: true,
    },
    employmentAddress: {
      type: String,
      required: true,
    },
    applicationDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const InsuranceLoan = mongoose.model("InsuranceLoan", insuranceLoanSchema);

export default InsuranceLoan;
