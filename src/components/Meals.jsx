import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';
import MealItem from './MealItem.jsx';

export default function Meals() {
	const {
		data: loadedMeals,
		isLoading,
		error,
	} = useHttp('http://localhost:3000/meals', null, []);

	if (isLoading) {
		return <p className='center'>loading .....</p>;
	}

	if (error) {
		return <Error title={'Filed to fetch meals'} message={error} />;
	}

	return (
		<ul id='meals'>
			{loadedMeals?.map((meal) => (
				<MealItem key={meal.id} meal={meal} />
			))}
		</ul>
	);
}
