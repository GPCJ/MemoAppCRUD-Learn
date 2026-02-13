import { useState, useEffect, useReducer, useRef } from 'react';
import { updateMemo, deleteMemo } from '../api/memos';
import { formatDate } from '../util/utillity';

// 상태 관리할 값의 포맷을 정의
const initialState = {
  editTitle: '',
  editContent: '',
  isEmpty: false,
};

// initialState을 복사해서 props로 받아온 수정 이전 값을 초기값으로 지정
function init(initialMemo) {
  return {
    ...initialState,
    editTitle: initialMemo.title,
    editContent: initialMemo.content,
  };
}

function editReducer(state, action) {
  switch (action.type) {
    case 'EDITING_TITLE':
      return {
        ...state,
        editTitle: action.payload,
        isEmpty: false, // 작성 시작 시 빈값 에러 해제
      };
    case 'EDITING_CONTENT':
      return {
        ...state,
        editContent: action.payload,
        isEmpty: false,
      };
    case 'SUBMIT_FIXED':
      return {};
    case 'CHECK_EMPTY':
      const isTitleEmpty = state.editTitle.trim();
      const isContentEmpty = state.editContent.trim();
      if (isTitleEmpty === '' || isContentEmpty === '') {
        return {
          ...state,
          isEmpty: true,
        };
      }
      return {
        ...state,
        isEmpty: false,
      };
  }
}

function EditMemo({ memo, setIsEditing, deleteMemoSync, updateMemoSync }) {
  const [state, dispatch] = useReducer(editReducer, memo, init); // memo 파라미터가 init 파라미터에 들어가서 init가 초기값이 됨
  const inputRef = useRef(null);

  // 단축키 반응
  const handleKeyDown = (e, memo) => {
    if (e.key === 'Enter') {
      handleUpdate(memo);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    } else {
      return;
    }
  };

  const handleUpdate = (memo) => {
    const updateInfo = {
      ...memo,
      title: state.editTitle,
      content: state.editContent,
    };
    updateMemo(memo.id, updateInfo);
    updateMemoSync(updateInfo);
    setIsEditing(false);
  };

  const handleDelete = (memo) => {
    deleteMemo(memo.id);
    deleteMemoSync(memo.id);
    setIsEditing(false);
  };

  return (
    <>
      {/* 입력 UI */}
      <input
        value={state.editTitle}
        onChange={(e) => {
          dispatch({ type: 'EDITING_TITLE', payload: e.target.value });
        }}
        onKeyDown={(e) => handleKeyDown(e, memo)}
        ref={inputRef}
        autoFocus
        className={`w-full p-4 mb-4 border  rounded-lg focus:ring-2  focus:border-transparent outline-none transition-all  text-white
                    ${
                      state.isEmpty
                        ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
                        : 'border-gray-200 placeholder-neutral-500 focus:ring-blue-500'
                    }`}
        placeholder="제목을 입력해주세요."
      />
      <textarea
        value={state.editContent}
        onChange={(e) => {
          dispatch({ type: 'EDITING_CONTENT', payload: e.target.value });
        }}
        onKeyDown={(e) => handleKeyDown(e, memo)}
        className={`w-full h-32 p-4 border  rounded-lg focus:ring-2  focus:border-transparent outline-none transition-all resize-none text-white
                    ${
                      state.isEmpty
                        ? 'border-red-500 placeholder-red-500 focus:ring-red-500'
                        : 'border-gray-200 placeholder-neutral-500 focus:ring-blue-500'
                    }`}
        placeholder="내용을 입력해주세요."
      />
      {/* 업데이트 시간과 조작 버튼 */}
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-white font-medium mr-auto">
          {`생성: ${formatDate(memo.updatedAt)}`}
        </span>
        <button
          onClick={() => {
            handleUpdate(memo);
            setIsEditing(false);
          }}
          className="text-white hover:bg-gray-500 rounded transition-colors text-sm p-2 "
        >
          확인
        </button>
        <button
          onClick={() => {
            handleDelete(memo);
          }}
          className="text-white hover:bg-red-500 rounded transition-colors text-sm p-2 "
        >
          삭제
        </button>
      </div>
    </>
  );
}

export default EditMemo;
