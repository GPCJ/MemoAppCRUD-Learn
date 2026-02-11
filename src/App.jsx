import { useState, useEffect } from 'react';
import './App.css';
import { Header, MemoInput, MemoList } from './components';
import { createMemo, getMemos, deleteMemo } from './api/memos';

const MemoMain = () => {
  const [memos, setMemos] = useState([]);

  // 기존 메모 최초 불러오기
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const memos = await getMemos();
        setMemos(memos.items);
      } catch (error) {
        console.error('로딩 실패!', error);
      }
    };
    fetchMemos();
  }, []);

  return (
    // 이 div 2개에 들어가 있는 tailwind 문구 해석 필요
    <div className="min-h-screen bg-[#22222] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <MemoInput createMemo={createMemo} />
        <MemoList memos={memos} deleteMemo={deleteMemo} setMemos={setMemos} />
      </div>
    </div>
  );
};

export default MemoMain;

// 새 메모 추가되면 상태 변화 감지해서 렌더링 해야함
