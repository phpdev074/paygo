import mongoose from 'mongoose';

const identificationSchema = new mongoose.Schema({
  typeOfIdentificationCard: {
    type: String,
    required: true,
  },
  idNumber: {
    type: String,
    required: true,
    unique: true, // Enforce unique ID numbers
  },
  occupationalStatus: {
    type: String,
  },
  incomeNature: {
    type: String,
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

export default mongoose.model('Identification', identificationSchema);
