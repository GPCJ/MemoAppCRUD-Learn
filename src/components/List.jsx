import { useState, useRef, useEffect } from 'react';
import { ViewMemo, EditMemo } from './components-index';

function MemoList({ memos, deleteMemoSync, updateMemoSync }) {
  const [editMemoId, setEditMemoId] = useState();
  const [isEditing, setIsEditing] = useState(false); // 이건 부모 컴포넌트에서 관리가 필요해 보임

  return (
    // 리스트 전체 박스
    <section className="grid gap-4">
      {memos.map((memo) => {
        return (
          // 항목
          <div
            key={memo.id}
            className="bg-[#3333] p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            {isEditing && memo.id === editMemoId ? (
              // 컴포넌트로 쪼개고 싶은 부분
              <EditMemo
                memo={memo}
                setIsEditing={setIsEditing}
                updateMemoSync={updateMemoSync}
                deleteMemoSync={deleteMemoSync}
              />
            ) : (
              // 컴포넌트로 쪼개고 싶은 부분
              <ViewMemo
                memo={memo}
                setIsEditing={setIsEditing}
                setEditMemoId={setEditMemoId}
                deleteMemoSync={deleteMemoSync}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}
export default MemoList;
