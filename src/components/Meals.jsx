import { useEffect, useState } from "react";
import "../Styles/Meals.css";
import { Link } from "react-router-dom";

function Meals({ selectedCategory, searchLetter }) {
	const [meals, setMeals] = useState([]);

	useEffect(() => {
		async function getMeals() {
			try {
				let data;

				if (searchLetter && searchLetter.length === 1) {
					const res = await fetch(
						`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetter}`
					);
					data = await res.json();
				} else if (selectedCategory) {
					const res = await fetch(
						`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
					);
					data = await res.json();
				}

				setMeals(data?.meals || []);
			} catch (err) {
				console.error("Error fetching meals:", err);
				setMeals([]);
			}
		}
		getMeals();
	}, [selectedCategory, searchLetter]);
	return (
		<main>
			<div className="container">
				<div className="meals">
					{meals.length > 0 ? (
						meals.map((meal) => (
							<Link to={`/meal/${meal.idMeal}`} key={meal.idMeal}>
								<div className="meal" data-id={meal.idMeal}>
									<img src={meal.strMealThumb} alt="Meal" loading="lazy" />
									<p>{meal.strMeal}</p>
								</div>
							</Link>
						))
					) : (
						<p>No meals found.</p>
					)}
				</div>
			</div>
		</main>
	);
}

export default Meals;
