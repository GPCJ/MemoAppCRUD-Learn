import { formatDate } from '../util/utillity';

function ViewMemo({ memo, setIsEditing, setEditMemoId, deleteMemoSync }) {
  return (
    <>
      <p className="text-white whitespace-pre-wrap pr-8">제목: {memo.title}</p>
      <p className="text-white whitespace-pre-wrap pr-8 my-5">
        내용: {memo.content}
      </p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-white font-medium mr-auto">
          {`생성: ${formatDate(memo.createdAt)}`}
        </span>
        <button
          onClick={() => {
            setEditMemoId(memo.id);
            setIsEditing(true);
          }}
          className="text-white hover:bg-blue-500 rounded transition-colors text-sm p-2 "
        >
          수정
        </button>
        <button
          onClick={() => {
            deleteMemo(memo.id);
            deleteMemoSync(memo.id);
          }}
          className="text-white hover:bg-red-500 rounded transition-colors text-sm p-2 "
        >
          삭제
        </button>
      </div>
    </>
  );
}

export default ViewMemo;
