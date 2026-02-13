import { useState, useEffect } from 'react';
import './App.css';
// 컴포넌트 불러오기
import {
  Header,
  MemoInput,
  SelectMemo,
  MemoList,
  Loading,
  ErrorMessage,
  EmptyMemos,
} from './components/components-index';
import { useSyncMemos } from './hooks/useSyncMemos';

const MemoMain = () => {
  // useSyncMemos Hook 상태, 함수
  const {
    memos,
    state,
    createMemoSync,
    deleteMemoSync,
    updateMemoSync,
    fetchMemos,
  } = useSyncMemos();

  return (
    <div className="min-h-screen bg-[#2222] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Header />
        <MemoInput createMemoSync={createMemoSync} />
        <SelectMemo fetchMemos={fetchMemos} />

        {state.isLoading && <Loading />}
        {state.isError && <ErrorMessage fetchMemos={fetchMemos} />}
        {state.isEmpty && <EmptyMemos />}

        <MemoList
          memos={memos}
          deleteMemoSync={deleteMemoSync}
          updateMemoSync={updateMemoSync}
        />
      </div>
    </div>
  );
};

export default MemoMain;
