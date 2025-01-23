import Header from './components/Header.jsx';
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CardContext.jsx';

function App() {
	return (
		<CartContextProvider>
			<Header />
			<Meals />
		</CartContextProvider>
	);
}

export default App;
