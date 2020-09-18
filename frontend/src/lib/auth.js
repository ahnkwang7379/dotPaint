import client from './client';

// 로그인
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

// 로그아웃
export const logout = () => client.post('/api/auth/logout');

// 회원가입
export const signup = ({ username, password }) =>
  client.post('/api/auth/signup', { username, password });

// 상태 확인
export const check = () => client.get('/api/auth/check');
