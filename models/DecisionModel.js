const mongoose = require("mongoose");
const schema = mongoose.Schema;

const NewDecision = new schema({
	name: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	profitOrLoss: {
		type: String,
		required: true,
	},
	preAsses: {
		type: String,
		required: true,
	},
});

module.exports = decision = mongoose.model("Decisions", NewDecision);