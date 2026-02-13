import { useState, useEffect, useReducer } from 'react';
import { getMemos } from '../api/memos';

const initialState = {
  memos: [],
  isLoading: false,
  isError: false,
  isEmpty: false,
};

function stateUI(state, action) {
  switch (action.type) {
    case 'FETCH_MEMO':
      return { ...state, memos: action.payload };
    // 로딩 스피너 ON / OFF
    case 'ON_LOADING':
      return { ...state, isLoading: true };
    case 'OFF_LOADING':
      return { ...state, isLoading: false };
    // 불러오기 중 통신 에러
    case 'ON_ERROR':
      return { ...state, isError: true };
    case 'OFF_ERROR':
      return { ...state, isError: false };
    // 작성된 메모가 없음
    case 'ON_EMPTY':
      return { ...state, isEmpty: true };
    case 'OFF_EMPTY':
      return { ...state, isEmpty: false };
    default:
      throw new error(`정의 되지 않은 action입니다 : (${action.type})`);
  }
}

// CRUD 통합 동기화
export const useSyncMemos = () => {
  const [state, dispatch] = useReducer(stateUI, initialState);

  // 메모 불러오기
  const fetchMemos = async (searchQuery) => {
    dispatch({ type: 'ON_LOADING' });
    try {
      const serverMemos = await getMemos(searchQuery);
      const items = serverMemos.items;
      dispatch({ type: 'FETCH_MEMO', payload: items });

      if (items.length === 0) {
        dispatch({ type: 'ON_EMPTY' });
      } else {
        dispatch({ type: 'OFF_EMPTY' });
      }
      setIsError(false);
    } catch (error) {
      console.log(
        'API 통신 에러 발생:',
        error.response.status || error.message,
      );

      dispatch({ type: 'ON_ERROR' });
    } finally {
      setTimeout(() => {
        dispatch({ type: 'OFF_LOADING' });
      }, 500);
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  // 메모 추가 동기화
  const createMemoSync = (newMemo) => setMemos((prev) => [newMemo, ...prev]);

  // 메모 삭제 동기화
  const deleteMemoSync = (id) =>
    setMemos((prev) => prev.filter((m) => m.id !== id));

  // 메모 수정 동기화
  const updateMemoSync = (memo) =>
    setMemos((prev) => prev.map((m) => (m.id === memo.id ? memo : m)));

  return {
    memos,
    isLoading,
    isError,
    isEmpty,
    createMemoSync,
    deleteMemoSync,
    updateMemoSync,
    fetchMemos,
  };
};
