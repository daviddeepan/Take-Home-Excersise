import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ApplicationScreen() {
	const [formData, setFormData] = useState({
		Name: "",
		Year: "",
		PlaceOfEstablishment: "",
		LoanAmount: "",
		AccountingProvider: "",
	});

	const { Name, Year, PlaceOfEstablishment, LoanAmount, AccountingProvider } =
		formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const navigate = useNavigate();

	const addApplication = async () => {
		// connecting to backend...
		const requestData = {
			name: Name,
			year: Year,
			address: PlaceOfEstablishment,
			loan_amount: LoanAmount,
			provider: AccountingProvider,
		};

		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			await axios.post(
				"http://localhost:5000/api/applications/",
				requestData,
				config
			);
		} catch (err) {
			console.log(err);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		addApplication({
			Name,
			Year,
			PlaceOfEstablishment,
			LoanAmount,
			AccountingProvider,
		});

		setFormData({
			Name: "",
			Year: "",
			PlaceOfEstablishment: "",
			LoanAmount: "",
			AccountingProvider: "",
		});

		navigate(`/balance-sheet/${Name}/${Year}/${AccountingProvider}/${LoanAmount}`);
	};

	return (
		<Fragment>
			<div>
				<h1>Application Screen</h1>
			</div>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="Name"
						value={Name}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Year of Establishment"
						name="Year"
						value={Year}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Place of Establishment "
						name="PlaceOfEstablishment"
						value={PlaceOfEstablishment}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Loan Amount requesting"
						name="LoanAmount"
						value={LoanAmount}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<label for="AccountingProvider">Accounting Provider</label>
				<select
					name="AccountingProvider"
					id="AccountingProvider"
					value={AccountingProvider}
					onChange={(e) => onChange(e)}
					required
				>
					<option value="">Select Provider</option>
					<option value="xero">XERO</option>
					<option value="myob">MYOB</option>
				</select>
				<br />
				<input
					type="submit"
					className="btn btn-primary"
					value="Submit"
				/>
			</form>
		</Fragment>
	);
}
