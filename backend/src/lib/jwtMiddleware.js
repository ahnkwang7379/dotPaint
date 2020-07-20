import jwt from 'jsonwebtoken';
import User from '../models/user';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next(); // 토큰이 없음
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    // 토큰의 남은 유효기간 체크
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 6) {
      // 6시간 이내로 남았으면 재발행
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24, // 1day
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    // 검증 실패
    return next();
  }
};

export default jwtMiddleware;
