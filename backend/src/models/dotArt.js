import mongoose, { Schema } from 'mongoose';

const DotArtSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, default: 'Dot Art' },
    dotFrame: [
      {
        dotSet: [String],
        border: { borderSize: String, color: String },
        dotSize: String,
        row: String,
        column: String,
      },
    ],
    openArt: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const DotArt = mongoose.model('DotArt', DotArtSchema);
export default DotArt;
