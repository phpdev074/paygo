import mongoose from 'mongoose';

const documentationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  facialPicture: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, 
  },
  identificationCard: {
    type: String,
    ref: 'Identification', 
  },
});

export default mongoose.model('Documentation', documentationSchema);
