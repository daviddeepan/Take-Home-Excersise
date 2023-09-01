import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResultScreen() {
	const { Name, Year, PreAsses, Total } = useParams();
	const navigate = useNavigate();

	const final = () => {
		if (Total > 60 || Total == 60) {
			return "Loan Approved";
		} else {
			return "Loan Not Approved ";
		}
	};

	const onSubmit = () => {
		navigate("/");
	};

	return (
		<div className="result-screen">
			<h2 className="pre-asses">Result Screen</h2>
			<h4 className="pre-asses"> Name of applicant : {Name}</h4>
			<h5 className="pre-asses">Year of Firm Establishment:{Year}</h5>
			<h4 className="pre-asses"> Summary of Firm : {Total}</h4>
			<h4 className="pre-asses">Final Pre-Assement Value : {PreAsses}</h4>
			<h1 className="pre-asses">Loan Status : {final()}</h1>
			<input
				type="button"
				className="button-container btn btn-primary"
				onClick={(e) => onSubmit(e)}
				value="Back To Home"
			/>
		</div>
	);
}
