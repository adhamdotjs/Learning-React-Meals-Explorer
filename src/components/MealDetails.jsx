import "../Styles/MealDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MealDetails() {
	const { id } = useParams();
	const [meal, setMeal] = useState(null);

	useEffect(() => {
		async function getMealDetails() {
			const res = await fetch(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
			);
			const data = await res.json();
			setMeal(data.meals[0]);
		}

		getMealDetails();
	}, [id]);
	if (!meal) return <p>Loading...</p>;
	return (
		<div className="details">
			<div className="container">
				<div className="meal-data">
					<h1 className="title">{meal.strMeal}</h1>
					<div className="root">
						<span>Category: {meal.strCategory}</span>
						<span>Area: {meal.strArea}</span>
					</div>
					<img src={meal.strMealThumb} alt="Meal" loading="lazy" />
					<div className="ingredients">
						<h5>📖Ingredients:</h5>
						<ul>
							{Array.from({ length: 20 }, (_, i) => i + 1)
								.map((i) => ({
									ingredient: meal[`strIngredient${i}`],
									measure: meal[`strMeasure${i}`],
								}))
								.filter((item) => item.ingredient)
								.map((item, index) => (
									<li key={index}>
										{item.ingredient} - {item.measure}
									</li>
								))}
						</ul>
					</div>
					<div className="instructions">
						<h5>👩‍🍳Instructions:</h5>
						<p>{meal.strInstructions}</p>
					</div>
					{meal.strYoutube && (
						<div className="link">
							<a href={meal.strYoutube} target="_blank">
								Watch Video Recipe on Youtube🎥
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default MealDetails;
