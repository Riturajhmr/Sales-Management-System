import FilterDropdown from "../inputs/FilterDropdown";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function FiltersRow({ query, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pb-4 pt-2 border-b border-gray-200">

      {/* Reset Filters */}
      <button
        onClick={() => onChange({
          regions: [],
          genders: [],
          ageRange: null,
          productCategories: [],
          tags: [],
          paymentMethods: [],
          dateFrom: null,
          dateTo: null,
        })}
        className="p-2 border rounded-md bg-white hover:bg-gray-50"
      >
        <ArrowPathIcon className="w-5 h-5 text-gray-600" />
      </button>

      <FilterDropdown
        label="Customer Region"
        options={["North", "South", "East", "West"]}
        selected={query.regions}
        onChange={(vals) => onChange({ regions: vals })}
      />

      <FilterDropdown
        label="Gender"
        options={["Male", "Female", "Other"]}
        selected={query.genders}
        onChange={(vals) => onChange({ genders: vals })}
      />

<FilterDropdown
  label="Age Range"
  options={["18-25", "26-35", "36-50", "50+"]}
  selected={query.ageRange ? [query.ageRange] : []}
  onChange={(vals) => {
    const val = vals[0]; // single-select logic
    
    if (!val) {
      onChange({ ageRange: null, ageMin: null, ageMax: null });
      return;
    }

    if (val === "50+") {
      onChange({ ageRange: val, ageMin: 50, ageMax: null });
      return;
    }

    const [min, max] = val.split("-").map(Number);
    onChange({ ageRange: val, ageMin: min, ageMax: max });
  }}
/>


      <FilterDropdown
        label="Product Category"
        options={["Clothing", "Beauty", "Electronics"]}
        selected={query.productCategories}
        onChange={(vals) => onChange({ productCategories: vals })}
      />

      <FilterDropdown
        label="Tags"
        options={[
          "accessories",
          "gadgets",
          "portable",
          "smart",
          "wireless",
          "beauty",
          "fragrance-free",
          "makeup",
          "organic",
          "skincare"
        ]}
        selected={query.tags}
        onChange={(vals) => onChange({ tags: vals })}
      />

      <FilterDropdown
        label="Payment Method"
        options={["Cash", "Credit Card", "Net Banking", "Wallet"]}
        selected={query.paymentMethods}
        onChange={(vals) => onChange({ paymentMethods: vals })}
      />

<FilterDropdown
  label="Year Range"
  options={["20-21", "21-22", "22-23", "23-24"]}
  selected={query.yearRange ? [query.yearRange] : []}
  onChange={(vals) => {
    const val = vals[0];

    if (!val) {
      onChange({
        yearRange: null,
        dateFrom: null,
        dateTo: null,
      });
      return;
    }

    let from = null;
    let to = null;

    switch (val) {
      case "20-21":
        from = "2020-01-01";
        to = "2021-12-31";
        break;
      case "21-22":
        from = "2021-01-01";
        to = "2022-12-31";
        break;
      case "22-23":
        from = "2022-01-01";
        to = "2023-12-31";
        break;
      case "23-24":
        from = "2023-01-01";
        to = "2024-12-31";
        break;
      default:
        from = null;
        to = null;
    }

    onChange({
      yearRange: val,
      dateFrom: from,
      dateTo: to,
    });
  }}
/>


      {/* Date filter (kept simple as button for now) */}
      <div className="flex items-center gap-2">
  <span className="text-sm font-medium text-gray-700">Date:</span>

  <input
    type="date"
    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none"
    value={query.dateFrom || ""}
    onChange={(e) =>
      onChange({
        dateFrom: e.target.value || null,
        page: 1, // reset page when filter changes
      })
    }
  />

  <span className="text-sm text-gray-600">to</span>

  <input
    type="date"
    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-gray-800 focus:outline-none"
    value={query.dateTo || ""}
    onChange={(e) =>
      onChange({
        dateTo: e.target.value || null,
        page: 1,
      })
    }
  />
</div>


    </div>
  );
}
