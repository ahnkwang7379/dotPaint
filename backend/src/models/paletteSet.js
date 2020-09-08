import mongoose from 'mongoose';

const { Schema } = mongoose;

const PaletteSetSchema = new Schema({
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
  palette: [
    {
      _id: mongoose.Types.ObjectId,
      nick: String,
      colors: [String],
    },
  ],
  lastUpdateDate: {
    type: Date,
    default: Date.now,
  },
});

const PaletteSet = mongoose.model('PaletteSet', PaletteSetSchema);
export default PaletteSet;
