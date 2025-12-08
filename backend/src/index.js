const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const salesRouter = require("./routes/salesRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRouter);

app.get("/", (req, res) => {

  res.send("Sales API running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
