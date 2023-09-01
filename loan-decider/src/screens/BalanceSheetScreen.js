import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

export default function BalanceSheetScreen() {
	const { Name, Year, AccountingProvider, LoanAmount } = useParams();

	const [sheet, setSheet] = useState([]);

	const getBalanceSheet = async () => {
		try {
			const { data } = await axios.get(
				"http://localhost:5000/api/balance-sheets/" // getting the balance from the backend...
			);
			setSheet(data);
		} catch (err) {
			console.log(err);
		}
	};

	const totalProfitorLoss = () => {
		let total = 0;
		for (const value in sheet) {
			total += parseInt(sheet[value].profitOrLoss, 10);
		}
		return total;
	};

	const totalAssets = () => {
		let assets = 0;
		for (const value in sheet) {
			assets += parseInt(sheet[value].assetsValue, 10);
		}
		return assets / 12;
	};

	const preAsses = () => {
		const total = totalProfitorLoss(); //calculating presAsses value.....
		const assets = totalAssets();
		let preAsses = 0;
		if (total && assets > LoanAmount) {
			return (preAsses = 100);
		} else if (total > 0) {
			return (preAsses = 60);
		} else {
			return (preAsses = 20);
		}
	};

	const total = totalProfitorLoss();
	const asses = preAsses();
	const navigate = useNavigate();

	useEffect(() => {
		getBalanceSheet();
	}, []);

	const addDecision = async () => {
		// connecting to decision engine...

		const requestData = {
			name: Name,
			year: Year,
			profitOrLoss: total,
			preAsses: asses,
		};

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			await axios.post(
				"http://localhost:5000/api/Decision/",
				requestData,
				config
			);
		} catch (err) {
			console.log(err);
		}
	};

	const onSubmit = async (e) => {
		try {
			addDecision({
				Name,
				Year,
				total,
				asses,
			});
			navigate(`/result-decision/${Name}/${Year}/${asses}/${total}`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="sheet-table">
			<h2>Name : {Name} </h2>
			<table>
				<thead>
					<tr>
						<th>Year</th>
						<th>Month</th>
						<th>Profit Or Loss</th>
						<th>Assets Value</th>
					</tr>
				</thead>
				{sheet.map((value, key) => {
					return (
						<tr key={key}>
							<td>{value.year}</td>
							<td>{value.month}</td>
							<td>{value.profitOrLoss}</td>
							<td>{value.assetsValue}</td>
						</tr>
					);
				})}
			</table>
			<div>
				<h4>Total Profit and loss : {totalProfitorLoss()}</h4>
				<h4>Total Assets Value : {totalAssets()}</h4>
				<h4>Requested Loan Amount : {LoanAmount}</h4>
				<h4 className="pre-asses">
					Final Pre-Assement Value : {preAsses()}
				</h4>
			</div>
			<input
				type="button"
				className="button-container btn btn-primary"
				onClick={(e) => onSubmit(e)}
				value="Confirm and Proceed"
			/>
		</div>
	);
}
