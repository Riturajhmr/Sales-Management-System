import SummaryCards from "../components/dashboard/SummaryCards";
import SortBar from "../components/dashboard/SortBar";
import FiltersRow from "../components/dashboard/FiltersRow";
import PaginationControls from "../components/dashboard/PaginationControls";
import SalesTable from "../components/table/SalesTable";

export default function Dashboard({ loading, error, summary, data, query, updateQuery }) {
  return (
    <div className="p-6 w-full">
      <FiltersRow query={query} onChange={updateQuery} />
      <SummaryCards summary={summary} loading={loading} />
      <SortBar query={query} onChange={updateQuery} />

      {loading ? (
        <p className="text-gray-500 mt-6">Loading...</p>
      ) : error ? (
        <p className="text-red-500 mt-6">{error}</p>
      ) : (
        <>
          <SalesTable rows={data.data} />
          <PaginationControls
            page={data.page}
            totalPages={data.totalPages}
            total={data.total}
            pageSize={data.pageSize}
            onPageChange={(p) => updateQuery({ page: p })}
          />
        </>
      )}
    </div>
  );
}
