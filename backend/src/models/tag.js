import mongoose from 'mongoose';

const { Schema } = mongoose;

const TagSchema = new Schema({
  name: String,
  color: [{ type: Schema.Types.ObjectId, ref: 'Color' }],
  palette: [{ type: Schema.Types.ObjectId, ref: 'Palette' }],
});

const Tag = mongoose.model('Tag', TagSchema);
export default Tag;
