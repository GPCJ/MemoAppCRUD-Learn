import { useState, useEffect } from 'react';
import './App.css';
import {
  Header,
  MemoInput,
  MemoList,
  Loading,
  ErrorMessage,
  NullMemos,
} from './components/components-index';
import { useSyncMemos } from './hooks/useSyncMemos';

const MemoMain = () => {
  const {
    memos,
    setMemos,
    isLoading,
    isError,
    createMemoSync,
    deleteMemoSync,
    updateMemoSync,
    fetchMemos,
  } = useSyncMemos();

  return (
    <div className="min-h-screen bg-[#2222] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header fetchMemos={fetchMemos} setMemos={setMemos} />
        <MemoInput createMemoSync={createMemoSync} />
        {/* 만약 isLoading이 true면 로딩 UI 컴포넌트 렌더링 */}
        {isLoading && <Loading />}
        {isError && <ErrorMessage fetchMemos={fetchMemos} />}
        <NullMemos />
        <MemoList
          isError={isError}
          memos={memos}
          deleteMemoSync={deleteMemoSync}
          updateMemoSync={updateMemoSync}
        />
      </div>
    </div>
  );
};

export default MemoMain;
