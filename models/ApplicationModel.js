const mongoose = require("mongoose");
const schema = mongoose.Schema;

const NewApplication = new schema({
	date: {
		type: Date,
		default: Date.now,
	},

	name: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},

	address: {
		type: String,
		required: true,
	},
	loan_amount: {
		type: String,
		required: true,
	},
	provider: {
		type: String,
		required: true,
	},
});

module.exports = application = mongoose.model("Application", NewApplication);
