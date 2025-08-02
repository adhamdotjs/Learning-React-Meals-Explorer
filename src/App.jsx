import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Meals from "./components/Meals";
import MealDetails from "./components/MealDetails";
import Footer from "./components/Footer";

function App() {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchLetter, setSearchLetter] = useState("");

	return (
		<Router>
			<Header setSearchLetter={setSearchLetter} />
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Landing setSelectedCategory={setSelectedCategory} />
							<Meals
								selectedCategory={selectedCategory}
								searchLetter={searchLetter}
							/>
						</>
					}
				/>
				<Route path="/meal/:id" element={<MealDetails />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
