const pool = require("../config/db");

function buildWhereClause({
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
}) {
  const conditions = [];
  const values = [];
  let idx = 1;

  if (search) {
    conditions.push(
      `(customer_name ILIKE $${idx} OR phone_number ILIKE $${idx})`
    );
    values.push(`%${search}%`);
    idx++;
  }

  if (regions && regions.length) {
    conditions.push(`customer_region = ANY($${idx})`);
    values.push(regions);
    idx++;
  }

  if (genders && genders.length) {
    conditions.push(`gender = ANY($${idx})`);
    values.push(genders);
    idx++;
  }

  if (ageMin != null) {
    conditions.push(`age >= $${idx}`);
    values.push(ageMin);
    idx++;
  }
  if (ageMax != null) {
    conditions.push(`age <= $${idx}`);
    values.push(ageMax);
    idx++;
  }

  if (productCategories && productCategories.length) {
    conditions.push(`product_category = ANY($${idx})`);
    values.push(productCategories);
    idx++;
  }

  if (tags && tags.length) {
    const tagConds = tags.map((_, i) => `tags ILIKE $${idx + i}`);
    conditions.push(`(${tagConds.join(" OR ")})`);
    tags.forEach((t) => values.push(`%${t}%`));
    idx += tags.length;
  }

  if (paymentMethods && paymentMethods.length) {
    conditions.push(`payment_method = ANY($${idx})`);
    values.push(paymentMethods);
    idx++;
  }

  if (dateFrom) {
    conditions.push(`date >= $${idx}`);
    values.push(dateFrom);
    idx++;
  }
  if (dateTo) {
    conditions.push(`date <= $${idx}`);
    values.push(dateTo);
    idx++;
  }

  const whereClause = conditions.length ? "WHERE " + conditions.join(" AND ") : "";
  return { whereClause, values };
}

function getSortColumn(sortBy) {
  switch (sortBy) {
    case "customerName":
      return "customer_name";
    case "quantity":
      return "quantity";
    case "date":
    default:
      return "date";
  }
}

async function fetchSales(params) {
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
  } = params;

  const { whereClause, values } = buildWhereClause({
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
  });

  const sortColumn = getSortColumn(sortBy);
  const order = sortOrder === "asc" ? "ASC" : "DESC";

  const offset = (page - 1) * limit;
  const limitIdx = values.length + 1;
  const offsetIdx = values.length + 2;

  const baseQuery = `
  SELECT
    id,
    transaction_id,
    date,
    customer_id,
    customer_name,
    phone_number,
    gender,
    age,
    product_category,
    quantity
  FROM sales
  ${whereClause}
  ORDER BY ${sortColumn} ${order}
  LIMIT $${limitIdx} OFFSET $${offsetIdx};
`;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM sales
    ${whereClause};
  `;

  const client = await pool.connect();
  try {
    const [rowsResult, countResult] = await Promise.all([
      client.query(baseQuery, [...values, limit, offset]),
      client.query(countQuery, values),
    ]);

    const total = Number(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    return {
      data: rowsResult.rows,
      total,
      page,
      pageSize: limit,
      totalPages,
    };
  } finally {
    client.release();
  }
}

async function fetchSalesSummary() {
  const result = await pool.query(`
    SELECT
      COALESCE(SUM(quantity), 0) AS total_units,
      COALESCE(SUM(final_amount), 0) AS total_amount,
      COALESCE(SUM(total_amount - final_amount), 0) AS total_discount
    FROM sales;
  `);

  const row = result.rows[0];

  return {
    totalUnits: Number(row.total_units),
    totalAmount: Number(row.total_amount),
    totalDiscount: Number(row.total_discount),
  };
}

module.exports = { fetchSales, fetchSalesSummary };
