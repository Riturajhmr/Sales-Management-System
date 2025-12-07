export default function SummaryCards({ summary, loading }) {
    const cards = [
      { label: "Total Units Sold", value: summary.totalUnits || 0 },
      { label: "Total Revenue", value: `₹ ${summary.totalAmount || 0}` },
      { label: "Total Discount", value: `₹ ${summary.totalDiscount || 0}` },
    ];
  
    return (
      <div className="grid grid-cols-3 gap-4 mt-4">
        {cards.map((c) => (
          <div key={c.label}
            className="bg-white shadow rounded-xl p-4"
          >
            <p className="text-gray-500 text-sm">{c.label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "..." : c.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  