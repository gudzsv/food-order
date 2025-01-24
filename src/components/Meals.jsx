import useHttp from '../hooks/useHttp.js';
import MealItem from './MealItem.jsx';

export default function Meals() {
	const {
		data: loadedMeals,
		isLoading,
		error,
	} = useHttp('http://localhost:3000/meals', null, []);

	if (isLoading) {
		return <p>loading .....</p>;
	}
	return (
		<ul id='meals'>
			{loadedMeals?.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	);
}
