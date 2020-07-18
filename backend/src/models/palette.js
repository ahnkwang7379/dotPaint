import mongoose from 'mongoose';

const { Schema } = mongoose;

const PaletteSchema = new Schema({
  id: String,
  nick: String,
  colors: [String],
  publishedData: {
    type: Date,
    default: Date.now,
  },
});

const Palette = mongoose.model('Palette', PaletteSchema);
export default Palette;
