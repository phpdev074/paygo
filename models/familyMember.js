import mongoose from 'mongoose';
const familyMemberSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
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
    enum: ['single', 'married', 'divorced','Single','Married','Divorced','SINGLE','MARRIED','DIVORCED'],
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
  timestamp: {
    type: Date,
    default: Date.now, 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

export default mongoose.model('FamilyMember', familyMemberSchema);
