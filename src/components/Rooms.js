import React from 'react';

import {useAppContext} from '../context/store';

import {
    ListItem,
    ListItemText,
    List,
    Divider} from '@material-ui/core';


export default function Rooms({handleDrawerClose}) {

    const {state, dispatch} = useAppContext();

    const rooms = Object.values(state.rooms.data);

    const selectedRoom = state.selectedRoom;

    const transitionToRoom = (id) => {
        dispatch({type: 'UPDATE_ROOM', roomId: id})
        handleDrawerClose();
    };
    
    return (
        <>
            <ListItem>
                <ListItemText primary={state.currentUser.nickName} />
            </ListItem>
            <Divider />
            <List component="nav" aria-label="Rooms">
                {rooms.map((room) => (
                    <ListItem
                        key={room.id}
                        className='list-item'
                        selected={selectedRoom === room.id}
                        button
                        onClick={() => transitionToRoom(room.id)}>
                        <ListItemText primary={room.name} />
                    </ListItem>
                ))}
            </List>
        </>
    )
}