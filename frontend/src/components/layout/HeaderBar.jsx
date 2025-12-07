import SearchBar from "../inputs/SearchBar";

export default function HeaderBar({ search, onSearchChange }) {
  return (
    <header className="flex items-center justify-between py-4">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Sales Management System</h1>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar value={search} onChange={onSearchChange} />

        <div className="w-9 h-9 bg-gray-300 rounded-full cursor-pointer hover:ring-2 hover:ring-gray-500"></div>
      </div>

    </header>
  );
}
