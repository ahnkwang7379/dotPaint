import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema(
  {
    username: String,
    hashedPassword: String,
    // preset은 3개 정도 등록할 수 있게
    palettePreset: [{ type: Schema.Types.ObjectId, ref: 'Palette' }],
    // 도트판도 3개정도 작업하던게 저장 가능하게
    dotArtPreset: [
      {
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
      },
    ],
  },
  { timestamps: true },
);

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true / false
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1d',
    },
  );
  return token;
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
