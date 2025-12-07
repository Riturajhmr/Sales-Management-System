export default function PaginationControls({
    page,
    totalPages,
    total,
    pageSize,
    onPageChange,
  }) {
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(total, page * pageSize);
  
    return (
      <div className="flex justify-between items-center mt-4 text-sm">
  
        <p className="text-gray-600">
          Showing {total === 0 ? 0 : start}-{end} of {total} results
        </p>
  
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={`px-3 py-1 border rounded-md ${
              page <= 1
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
  
          <span className="mx-1">Page {page} of {totalPages || 1}</span>
  
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className={`px-3 py-1 border rounded-md ${
              page >= totalPages
                ? "cursor-not-allowed bg-gray-100 text-gray-400"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
  
      </div>
    );
  }
  