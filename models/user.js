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
  phoneNumber: {
    type: Number,
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

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10; // Adjust salt rounds as needed for security
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
  }
  next();
});

export default mongoose.model('User', userSchema);
