import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {

    const navigate = useNavigate();
	const navigateToApplication = () => {
		navigate("/start");
	};
	return (
		<div>
			<h1>Loan - Decider</h1>

			<input
				type="button"
				className="button-container btn btn-primary"
				onClick={navigateToApplication}
				value="START"
			/>
		</div>
	);
}
