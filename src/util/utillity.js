// 날짜 데이터 포맷 함수
export const formatDate = (date) => {
  if (!date) return '';
  return date.replace('T', ' ').slice(0, 16);
};
