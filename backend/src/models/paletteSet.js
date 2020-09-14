import mongoose from 'mongoose';

const { Schema } = mongoose;

const PaletteSetSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    palette: [{ type: Schema.Types.ObjectId, ref: 'Palette' }],
  },
  { timestamps: true },
);

const PaletteSet = mongoose.model('PaletteSet', PaletteSetSchema);
export default PaletteSet;

// 사용 안할듯
