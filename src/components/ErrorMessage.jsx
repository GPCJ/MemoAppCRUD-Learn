import { getMemos } from '../api/memos';

function ErrorMessage({ fetchMemos }) {
  const refetch = () => {
    const firstPage = {
      page: 1,
      limit: 10,
    };
    getMemos(firstPage);
    fetchMemos();
  };

  return (
    <div className="flex items-center justify-between w-full bg-red-50 border border-red-100 px-4 py-3 mb-5 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-red-500 text-lg">⚠️</span>
        <p className="text-sm text-red-800 font-medium">
          데이터 불러오기에 실패했습니다.
        </p>
      </div>
      <button
        onClick={refetch}
        className="text-sm font-bold text-red-600 hover:underline decoration-2 underline-offset-4"
      >
        재시도
      </button>
    </div>
  );
}

export default ErrorMessage;
