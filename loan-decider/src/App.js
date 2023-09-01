import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ApplicationScreen from "./screens/ApplicationScreen";
import BalanceSheetScreen from "./screens/BalanceSheetScreen";
import ResultScreen from "./screens/ResultScreen";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<HomeScreen />} />
				<Route exact path="/start" element={<ApplicationScreen />} />
				<Route
					exact
					path="/balance-sheet/:Name/:Year/:AccountingProvider/:LoanAmount"
					element={<BalanceSheetScreen />}
				/>
				<Route
					exact
					path="/result-decision/:Name/:Year/:PreAsses/:Total"
					element={<ResultScreen />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
