const express = require("express");
const router = express.Router();

const decision = require("../../models/DecisionModel");

router.get("/", (req, res) => {
	//getting all decisions till date.
	decision
		.find()
		.sort({ date: -1 })
		.then((items) => res.json(items));
});

router.post("/", async (req, res) => {
	const NewDecision = new decision({
		name: req.body.name,
		year: req.body.year,
		profitOrLoss: req.body.profitOrLoss,
		preAsses: req.body.preAsses,
	});
	NewDecision.save().then((item) => res.json(item));
});

router.get("/applicant-decision/:id", async (req, res) => {
	//getting specific application by id.
	try {
		const applicant = await decision.findById(req.params.id);
		if (!applicant) throw Error("Applicant-Decision does not exist");
		res.json(applicant);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

module.exports = router;