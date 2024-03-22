import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate: {
      validator: (email) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      message: 'Invalid email format'
    }
  },
  image:{
    type:String
  },
  isVerified:{
    type:Boolean,
    default:false,
  },
  phoneNumber: {
    type: Number,
    unique:true,
  },
  countryCode: {
    type: Number,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  birthPlace: {
    type: String,
  },
  nationality: {
    type: String,
  },
  educationStatus: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now, 
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  country: {
    type: String,
    required: true,
  },
  currentAddress: {
    type: String,
  },
  region: {
    type: String,
  },
  zone: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  subCity: {
    type: String,
  },
  woreda: {
    type: String,
  },
  houseNumber: {
    type: String,
  },
  landlineNumber: {
    type: String,
  },
  facialPicture: {
    type: String,
    required: true,
  },

  identificationCard: {
    type: String,
    ref: 'Identification', 
  },
  fName: {
    type: String,
    required: true,
  },
  notification:{
    type:Boolean,
    default:false
  },
  mName: {
    type: String,
  },
  gFName: {
    type: String,
  },
  gMName: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  fullNameOfSpouse: {
    type: String,
  },
  totalFamilyNumber: {
    type: Number,
  },
  totalMaleNumber: {
    type: Number,
  },
  totalFemaleNumber: {
    type: Number,
  },
  typeOfIdentificationCard: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true, 
  },
  occupationalStatus: {
    type: String,
  },
  incomeNature: {
    type: String,
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.model('User', userSchema);
