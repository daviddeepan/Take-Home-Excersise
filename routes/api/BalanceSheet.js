const express = require("express");
const router = express.Router();

const balanceSheet = require("../../models/BalanceSheetModel");

router.get("/", (req, res) => {
	//getting all loan application till date.
	balanceSheet
		.find()
		.sort({ date: -1 })
		.then((items) => res.json(items));
});

router.post("/", async (req, res) => {
	const balance = new balanceSheet({
		year: req.body.year,
		month: req.body.month,
		profitOrLoss: req.body.profitOrLoss,
		assetsValue: req.body.assetsValue,
	});
	balance.save().then((item) => res.json(item));
});

module.exports = router;
