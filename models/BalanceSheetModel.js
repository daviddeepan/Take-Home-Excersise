const mongoose = require("mongoose");
const schema = mongoose.Schema;

const NewBalanceSheet = new schema({
	year: {
		type: String,
		required: true,
	},
	month: {
		type: String,
		required: true,
	},
	profitOrLoss: {
		type: String,
		required: true,
	},
	assetsValue: {
		type: String,
		required: true,
	},
});

module.exports = balanceSheet = mongoose.model("BalanceSheet", NewBalanceSheet);
