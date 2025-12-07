const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

let salesDataCache = null;

function loadSalesData() {
  if (salesDataCache) return salesDataCache;

  const filePath = path.join(__dirname, "..", "data", "sales.csv");
  const csv = fs.readFileSync(filePath, "utf-8");

  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  salesDataCache = records.map((row) => ({
    ...row,
    Quantity: Number(row.Quantity) || 0,
    Age: row.Age ? Number(row.Age) : null,
    "Price per Unit": Number(row["Price per Unit"]) || 0,
    "Discount Percentage": Number(row["Discount Percentage"]) || 0,
    "Total Amount": Number(row["Total Amount"]) || 0,
    "Final Amount": Number(row["Final Amount"]) || 0,
    Date: new Date(row.Date),
  }));

  return salesDataCache;
}

module.exports = { loadSalesData };
