import React, { useReducer, createContext, useContext } from 'react';
import Mock from '../Mock';
import {generateUId} from '../Utils/General.js';


const currentUser = {
	id: generateUId(),
	nickName: ''
};

const Context = createContext();
const useAppContext = () => useContext(Context);

const initialState = {
	...Mock,
	currentUser
};

const mainReduce = (state, action) => {
	switch (action.type) {

		case 'UPDATE_NICKNAME':
			return {
				...state,
				currentUser: {
					...state.currentUser,
					nickName: action.nickName
				}
			};
		default:
			return state;
	}
};

function ContextProvider(props) {
	const [state, dispatch] = useReducer(mainReduce, initialState);
	return (
		<Context.Provider value={{ state, dispatch }}>
			{props.children}
		</Context.Provider>
	);
};

export { ContextProvider, Context, useAppContext };