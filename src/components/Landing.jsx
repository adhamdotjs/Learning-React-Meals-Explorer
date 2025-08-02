import { Container } from "react-bootstrap";
import SpinDish from "../assets/76675727_9838591.webp";
import "../Styles/Landing.css";
import { useEffect, useState } from "react";

function Landing({ setSelectedCategory }) {
	const [categories, setCategories] = useState([]);
	const [selected, setSelected] = useState("");

	useEffect(() => {
		async function getCategories() {
			let data = await fetch(
				"https://www.themealdb.com/api/json/v1/1/list.php?c=list"
			);
			data = await data.json();
			setCategories(data.meals);
		}
		getCategories();
	}, []);

	useEffect(() => {
		const saved = localStorage.getItem("category");
		if (saved) {
			setSelected(saved);
			setSelectedCategory(saved);
		}
	}, []);

	const handleChange = (e) => {
		const selectedValue = e.target.value;
		setSelected(selectedValue);
		localStorage.setItem("category", selectedValue);
		setSelectedCategory(selectedValue);
	};

	return (
		<section className="hero">
			<Container>
				<div className="content">
					<div className="text">
						<h1>
							Where Every Recipe <span>Tells a Story</span>
						</h1>
						<img src={SpinDish} alt="Dish Meal" />
					</div>
					<select
						name="category"
						id="category"
						value={selected}
						onChange={handleChange}>
						{categories.map((cat, index) => (
							<option key={index} value={cat.strCategory}>
								{cat.strCategory}
							</option>
						))}
					</select>
				</div>
			</Container>
		</section>
	);
}

export default Landing;
