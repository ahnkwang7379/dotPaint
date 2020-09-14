import mongoose from 'mongoose';

const { Schema } = mongoose;

const PaletteSchema = new Schema(
  {
    nick: String,
    colors: [String],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    openPalette: { type: Boolean, default: true },
  },
  { timestamps: true }, // createAt과 updateAt 생성
);

// public toggle 기능
// 단일 작업으로는 하기 불가능
// 다른 방법으로는 찾은 후 수정 or 처음에 true false 주기
// PaletteSchema.statics.togglePublic = function (id) {
//   const data = this.findById({ id });
//   data.public = !data.public;
//   data.save
// }

// nick으로 검색
PaletteSchema.statics.findByNick = function (nick) {
  return this.find({ nick });
};

// tag로 검색
PaletteSchema.statics.findByTag = function (tag) {
  return this.find({ tag });
};

const Palette = mongoose.model('Palette', PaletteSchema);
export default Palette;
