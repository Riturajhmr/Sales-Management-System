import { useEffect, useState } from "react";
import { fetchSales, fetchSalesSummary } from "./services/salesApi";
import Sidebar from "./components/layout/Sidebar";
import HeaderBar from "./components/layout/HeaderBar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [query, setQuery] = useState({
    search: "",
    regions: [],
    genders: [],
    ageMin: null,
    ageMax: null,
    productCategories: [],
    tags: [],
    paymentMethods: [],
    dateFrom: null,
    dateTo: null,
    sortBy: "date",
    sortOrder: "desc",
    page: 1,
    limit: 10,
  });

  const [data, setData] = useState({ data: [], total: 0, page: 1, pageSize: 10, totalPages: 1 });
  const [summary, setSummary] = useState({ totalUnits: 0, totalAmount: 0, totalDiscount: 0 });
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState("");

  const updateQuery = (update) => {
    setQuery((prev) => ({
      ...prev,
      ...update
    }));
  };
  

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchSales(query);
        setData(res);
        setError("");
      } catch {
        setError("Failed to fetch data");
      }
      setLoading(false);
    };
    load();
  }, [query]);

  useEffect(() => {
    const loadSummary = async () => {
      setSummaryLoading(true);
      try {
        const res = await fetchSalesSummary();
        setSummary(res);
      } finally {
        setSummaryLoading(false);
      }
    };
    loadSummary();
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-10 bg-gray-50 min-h-screen w-full">
        <HeaderBar search={query.search} onSearchChange={(v) => updateQuery({ search: v })} />
        <Dashboard
          loading={loading || summaryLoading}
          error={error}
          summary={summary}
          data={data}
          query={query}
          updateQuery={updateQuery}
        />
      </main>
    </div>
  );
}
