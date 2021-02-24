import qs from 'qs';
import client from './client';

// 도트 리스트 들고오기
export const getDotArtsList = ({ page, username, tag }) => {
  const queryString = qs.stringify({ page, username, tag });
  return client.get(`/api/dotArt?${queryString}`);
};

// DotArt 저장
export const saveDotArt = ({ dotArtId, title, dotArt, tags }) => {
  if (dotArtId) {
    // 기존 DotArt에 저장
    return client.patch(`/api/dotArt/${dotArtId}`, { title, dotArt, tags });
  } else {
    // 신규 생성
    return client.post('/api/dotArt', { title, dotArt, tags });
  }
};

// DotArt 삭제
export const deleteDotArt = (dotArtId) =>
  client.delete(`/api/dotArt/${dotArtId}`);

// DotArt 포스트 읽기
export const readDotArt = (dotArtId) => client.get(`/api/dotArt/${dotArtId}`);
