export default function SortBar({ query, onChange }) {
    return (
      <div className="flex justify-end items-center mt-6 mb-3 text-sm">

  <div className="flex items-center gap-2">
    <span className="text-gray-600 font-medium">Sort by:</span>

    <select
      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-gray-800"
      value={query.sortBy}
      onChange={(e) => onChange({ sortBy: e.target.value })}
    >
      <option value="date">Date</option>
      <option value="customerName">Customer Name</option>
      <option value="quantity">Quantity</option>
    </select>

    <button
      className="border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100"
      onClick={() =>
        onChange({
          sortOrder: query.sortOrder === "asc" ? "desc" : "asc",
        })
      }
    >
      {query.sortOrder === "asc" ? "↑ A–Z" : "↓ Z–A"}
    </button>
  </div>

</div>

    );
  }
  