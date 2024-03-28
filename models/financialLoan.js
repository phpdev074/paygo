import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    loanTerms: { type: String },
    uploadid: { type: String },
    loanType: { type: String },
    collateral: { type: String },
    collateralValueApprovedBy: { type: String },
    loanTerm: { type: String },
    loanAmount: { type: String },
    reasonForLoan: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    tinNumber: { type: String },
    companyName: { type: String },
    tinRegistrationImage: { type: String },
    businessLicenseImage: { type: String },
    address: { type: String },
    idNumber: { type: String },
    uplaodIdImage: { type: String },
    employementAddress: { type: String },
    applicationDate: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
