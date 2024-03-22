import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const carNameSchema = new Schema({
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'BrandName', 
    required: true
  },
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

const CarName = model('CarName', carNameSchema);

export default CarName;
