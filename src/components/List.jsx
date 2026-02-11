import { deleteMemo } from '../api/memos';

function MemoList({ memos, deleteMemoSync }) {
  // 날짜 데이터 포맷 함수
  const formatDate = (date) => {
    if (!date) return '';
    return date.replace('T', ' ').slice(0, 16);
  };

  return (
    <div className="grid gap-4">
      {memos.length === 0 ? (
        <p className="text-center text-white py-10">
          아직 작성된 메모가 없어요. ✍️
        </p>
      ) : (
        memos.map((memo) => (
          <div
            key={memo.id}
            className="bg-[#3333] p-5 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group"
          >
            <p className="text-white whitespace-pre-wrap pr-8">
              제목: {memo.title}
            </p>
            <p className="text-white whitespace-pre-wrap pr-8 my-5">
              내용: {memo.content}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-white font-medium">
                {`생성: ${formatDate(memo.createdAt)}`}
              </span>
              <button
                onClick={() => {
                  deleteMemo(memo.id);
                  deleteMemoSync(memo.id);
                }}
                className="text-white hover:text-red-500 transition-colors text-sm"
              >
                삭제
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default MemoList;
