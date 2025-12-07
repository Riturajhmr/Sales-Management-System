const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const pool = require("../src/config/db");

async function importCsv() {
  const filePath = path.join(__dirname, "..", "src", "data", "sales.csv");

  const parser = fs
    .createReadStream(filePath)
    .pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
      })
    );

  let count = 0;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for await (const row of parser) {
      await client.query(
        `INSERT INTO sales (
          transaction_id, date, customer_id, customer_name, phone_number,
          gender, age, customer_region, customer_type, product_id,
          product_name, brand, product_category, tags, quantity,
          price_per_unit, discount_percentage, total_amount, final_amount,
          payment_method, order_status, delivery_type, store_id, store_location,
          salesperson_id, employee_name
        ) VALUES (
          $1,$2,$3,$4,$5,
          $6,$7,$8,$9,$10,
          $11,$12,$13,$14,$15,
          $16,$17,$18,$19,$20,
          $21,$22,$23,$24,$25,$26
        )`,
        [
          row["Transaction ID"],
          row["Date"],
          row["Customer ID"],
          row["Customer Name"],
          row["Phone Number"],
          row["Gender"],
          row["Age"] ? Number(row["Age"]) : null,
          row["Customer Region"],
          row["Customer Type"],
          row["Product ID"],
          row["Product Name"],
          row["Brand"],
          row["Product Category"],
          row["Tags"],
          row["Quantity"] ? Number(row["Quantity"]) : null,
          row["Price per Unit"] ? Number(row["Price per Unit"]) : null,
          row["Discount Percentage"] ? Number(row["Discount Percentage"]) : null,
          row["Total Amount"] ? Number(row["Total Amount"]) : null,
          row["Final Amount"] ? Number(row["Final Amount"]) : null,
          row["Payment Method"],
          row["Order Status"],
          row["Delivery Type"],
          row["Store ID"],
          row["Store Location"],
          row["Salesperson ID"],
          row["Employee Name"],
        ]
      );

      count++;
      if (count % 1000 === 0) {
        console.log(`Inserted ${count} rows...`);
      }
    }

    await client.query("COMMIT");
    console.log(`Import complete! Inserted ${count} rows 🚀🔥`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error during import:", err);
  } finally {
    client.release();
    process.exit();
  }
}

importCsv();
