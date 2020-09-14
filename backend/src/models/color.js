import mongoose from 'mongoose';

const { Schema } = mongoose;

const ColorSchema = new Schema(
  {
    colorCode: String,
    tags: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Tag' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    palettes: [{ type: Schema.Types.ObjectId, ref: 'Palette' }],
  },
  { timestamps: true },
);

const Color = mongoose.model('Color', ColorSchema);
export default Color;
