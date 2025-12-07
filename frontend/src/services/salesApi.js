import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function fetchSales(query) {
  const params = {};

  if (query.search) params.search = query.search;
  if (query.regions?.length) params.regions = query.regions;
  if (query.genders?.length) params.genders = query.genders;
  if (query.productCategories?.length)
    params.productCategories = query.productCategories;
  if (query.tags?.length) params.tags = query.tags;
  if (query.paymentMethods?.length)
    params.paymentMethods = query.paymentMethods;
  if (query.ageMin != null) params.ageMin = query.ageMin;
  if (query.ageMax != null) params.ageMax = query.ageMax;

  if (query.dateFrom) params.dateFrom = query.dateFrom;
  if (query.dateTo) params.dateTo = query.dateTo;

  params.sortBy = query.sortBy;
  params.sortOrder = query.sortOrder;
  params.page = query.page;
  params.limit = query.limit || 10;

  const res = await axios.get(`${API_BASE}/api/sales`, { params });
  console.log("Query Params Sent:", params);
  return res.data;
}


export async function fetchSalesSummary() {
  const res = await axios.get(`${API_BASE}/api/sales/summary`);
  return res.data;
}
