import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
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

export default mongoose.model('Address', addressSchema);
