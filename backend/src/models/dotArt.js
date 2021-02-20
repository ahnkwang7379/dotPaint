import mongoose, { Schema } from 'mongoose';

const DotArtSchema = new Schema(
  {
    user: {
      _id: mongoose.Types.ObjectId,
      username: String,
    },
    title: { type: String, default: 'Dot Art' },
    dotArt: {
      dotFrameList: [
        {
          id: String,
          layerList: [[[String]]],
          interval: Number,
        },
      ],
      rowCount: Number,
      columnCount: Number,
      animationDuration: Number,
      layerData: [
        {
          layerName: String,
          dotFrameIdx: Number,
        },
      ],
    },
    tags: [String],
  },
  { timestamps: true },
);

const DotArt = mongoose.model('DotArt', DotArtSchema);

export default DotArt;
