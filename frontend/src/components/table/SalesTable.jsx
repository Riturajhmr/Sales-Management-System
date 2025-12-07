import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function SalesTable({ rows }) {
  const [copiedId, setCopiedId] = useState(null);

  if (!rows || rows.length === 0) {
    return (
      <div className="mt-4 bg-white shadow rounded-xl p-8 text-center">
        <p className="text-gray-500 text-lg">No results found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  const displayValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }
    return value;
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber === "-") return null;
    
    let cleaned = phoneNumber.toString().trim();
    
    return `+91 ${cleaned}`;
  };

  const copyToClipboard = async (phoneNumber, rowId) => {
    if (!phoneNumber || phoneNumber === "-") return;
    
    const formattedNumber = formatPhoneNumber(phoneNumber);
    if (!formattedNumber) return;
    
    try {
      await navigator.clipboard.writeText(formattedNumber);
      setCopiedId(rowId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="mt-4 overflow-x-auto bg-white shadow rounded-xl">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Transaction ID</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Customer ID</th>
            <th className="px-4 py-3">Customer name</th>
            <th className="px-4 py-3">Phone Number</th>
            <th className="px-4 py-3">Gender</th>
            <th className="px-4 py-3">Age</th>
            <th className="px-4 py-3">Product Category</th>
            <th className="px-4 py-3">Quantity</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{displayValue(row.transaction_id)}</td>
              <td className="px-4 py-2">
                {row.date ? new Date(row.date).toLocaleDateString() : "-"}
              </td>
              <td className="px-4 py-2">{displayValue(row.customer_id)}</td>
              <td className="px-4 py-2">{displayValue(row.customer_name)}</td>
              <td className="px-4 py-2">
                {row.phone_number && row.phone_number !== "-" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{formatPhoneNumber(row.phone_number)}</span>
                    <button
                      onClick={() => copyToClipboard(row.phone_number, row.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Copy phone number"
                    >
                      {copiedId === row.id ? (
                        <CheckIcon className="w-4 h-4 text-green-600" />
                      ) : (
                        <ClipboardDocumentIcon className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2">{displayValue(row.gender)}</td>
              <td className="px-4 py-2">{displayValue(row.age)}</td>
              <td className="px-4 py-2">{displayValue(row.product_category)}</td>
              <td className="px-4 py-2 font-semibold">{displayValue(row.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
