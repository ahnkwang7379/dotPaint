import mongoose, { Schema } from 'mongoose';

const DotArtSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: 'Dot Art' },
    dotList: [
      {
        id: String,
        dot: [String],
        interval: Number,
      },
    ],
    border: { borderSize: Number, color: String },
    dotSize: Number,
    rowCount: Number,
    columnCount: Number,
    animationDuration: Number,
    openArt: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const DotArt = mongoose.model('DotArt', DotArtSchema);
export default DotArt;
