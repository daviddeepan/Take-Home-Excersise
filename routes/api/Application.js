const express = require("express");
const router = express.Router();

const application = require("../../models/ApplicationModel");

router.get("/", (req, res) => {
	//getting all loan application till date.
	application
		.find()
		.sort({ date: -1 })
		.then((items) => res.json(items));
});

router.post("/", async (req, res) => {
	const newApplication = new application({
		name: req.body.name,
		year: req.body.year,
		address: req.body.address,
		loan_amount: req.body.loan_amount,
		provider: req.body.provider,
	});
	newApplication.save().then((item) => res.json(item));
});

router.get("/applicant/:id", async (req, res) => {
	//getting specific application by id.
	try {
		const applicant = await application.findById(req.application.id);
		if (!applicant) throw Error("Applicant does not exist");
		res.json(applicant);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

module.exports = router;
