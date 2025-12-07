export default function SearchBar({ value, onChange }) {
    return (
      <input
        type="text"
        placeholder="Search by customer or phone..."
        className="px-4 py-2 w-64 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  