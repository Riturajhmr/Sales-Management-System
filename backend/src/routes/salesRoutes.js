const express = require("express");
const { getSales, getSalesSummary } = require("../controllers/salesController");

const router = express.Router();

router.get("/", getSales);           
router.get("/summary", getSalesSummary); 

module.exports = router;
