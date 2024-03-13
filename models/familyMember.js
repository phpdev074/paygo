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
    enum: ['signle', 'married', 'Divorced'],
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
