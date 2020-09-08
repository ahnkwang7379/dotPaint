import mongoose from 'mongoose';

const { Schema } = mongoose;

const PaletteSchema = new Schema({
  nick: String,
  colors: [String],
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdateDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

// nick으로 검색하게 해주는 메서드
PaletteSchema.statics.findByNick = function (nick) {
  return this.find({ nick });
};

const Palette = mongoose.model('Palette', PaletteSchema);
export default Palette;
