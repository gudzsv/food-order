import { createContext } from 'react';

const UserProgressContext = createContext({
	progress: '', //! ToDo cart
	showCart: () => {},
	hideCart: () => {},
	showCheckOut: () => {},
	hideCheckOut: () => {},
});

export function UserProgressContextProvider({ children }) {
	return (
		<UserProgressContext.Provider>{children}</UserProgressContext.Provider>
	);
}

export default UserProgressContext;
