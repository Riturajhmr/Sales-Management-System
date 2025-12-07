const { fetchSales, fetchSalesSummary } = require("../services/salesService");

const parseList = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return String(val)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
};

async function getSales(req, res) {
  try {
    const {
      search,
      regions,
      genders,
      ageMin,
      ageMax,
      productCategories,
      tags,
      paymentMethods,
      dateFrom,
      dateTo,
      sortBy,
      sortOrder,
      page,
      limit,
    } = req.query;

    const parsedAgeMin = ageMin ? Number(ageMin) : null;
    const parsedAgeMax = ageMax ? Number(ageMax) : null;
    
    const validAgeMin = (parsedAgeMin != null && !isNaN(parsedAgeMin)) ? parsedAgeMin : null;
    const validAgeMax = (parsedAgeMax != null && !isNaN(parsedAgeMax)) ? parsedAgeMax : null;
    
    const validDateFrom = dateFrom || null;
    const validDateTo = dateTo || null;
    
    let finalAgeMin = validAgeMin;
    let finalAgeMax = validAgeMax;
    if (finalAgeMin != null && finalAgeMax != null && finalAgeMin > finalAgeMax) {
      [finalAgeMin, finalAgeMax] = [finalAgeMax, finalAgeMin];
    }
    
    let finalDateFrom = validDateFrom;
    let finalDateTo = validDateTo;
    if (finalDateFrom && finalDateTo && finalDateFrom > finalDateTo) {
      [finalDateFrom, finalDateTo] = [finalDateTo, finalDateFrom];
    }

    const result = await fetchSales({
      search: search || "",
      regions: parseList(regions),
      genders: parseList(genders),
      ageMin: finalAgeMin,
      ageMax: finalAgeMax,
      productCategories: parseList(productCategories),
      tags: parseList(tags),
      paymentMethods: parseList(paymentMethods),
      dateFrom: finalDateFrom,
      dateTo: finalDateTo,
      sortBy: sortBy || "date",
      sortOrder: sortOrder === "asc" ? "asc" : "desc",
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });

    res.json(result);
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getSalesSummary(req, res) {
  try {
    const summary = await fetchSalesSummary();
    res.json(summary);
  } catch (err) {
    console.error("Summary Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { getSales, getSalesSummary };
