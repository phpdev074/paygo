import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const brandNameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const BrandName = model('BrandName', brandNameSchema);

export default BrandName;
