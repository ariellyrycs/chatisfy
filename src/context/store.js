import React, { useReducer, createContext, useContext } from 'react';
import Mock from '../Mock';
import { generateUId, generateTime } from '../Utils/General.js';


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
		case 'UPDATE_ROOM':
			return {
				...state,
				selectedRoom: action.roomId
			};
		case 'SEND_MESSAGE':
			let currentId = generateUId();
			let rooms = state.rooms;
			let messageByRooms = rooms.messages;
			let messages = state.messages;
			let currentRoomId = state.selectedRoom,
				sentBy = action.sentBy;
			return {
				...state,
				rooms: {
					...rooms,
					messages: {
						...rooms.messages,
						[currentRoomId]: [...(messageByRooms[currentRoomId] || []), currentId]
					}
				},
				messages: {
					...messages,
					data: {
						...messages.data,
						[currentId]: {
							id: currentId,
							from: sentBy,
							content: action.message,
							createdTime: generateTime(),
							seenBy: [],
							own: action.from === sentBy
						}
					}
				}
			};
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