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
});


export default mongoose.model('User', userSchema);
