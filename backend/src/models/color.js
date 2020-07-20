import mongoose from 'mongoose';

const { Schema } = mongoose;

const ColorSchema = new Schema({
  id: String,
  colorCode: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const Color = mongoose.model('Color', ColorSchema);
export default Color;
