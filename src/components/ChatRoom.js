import React, { useState } from 'react';
import { useAppContext } from '../context/store';
import Messages from './Messages';
import { Grid, Typography, TextField, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
    spacingAroundSm: {
        margin: '10px 0'
    },
    staticContainer: {
        position: 'relative'
    }
});

export default function ChatRoom() {

    const [message, setMessage] = useState('');

    const { state, dispatch } = useAppContext();

    const classes = useStyles();

    const currentRoom = state.rooms.data[state.selectedRoom];

    const currentMessagesIds = state.rooms.messages[state.selectedRoom];

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;
        //TODO: make call to save use effect
        dispatch({ type: 'SEND_MESSAGE', message, from: state.currentUser.currentUserId });

        setMessage('');
        return false;
    };

    const handleEnter = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            sendMessage(e);
        }
        return false;
    };

    return (
        <Grid container direction='column'>
            <Grid item className={clsx(classes.spacingAroundSm, classes.staticContainer)}>
                <Box textAlign='center'>
                    <Typography variant='h6' component='h2'>{currentRoom.name}</Typography>
                </Box>
                <Messages currentMessagesIds={currentMessagesIds} />
            </Grid>
            <Grid item className={classes.spacingAroundSm}>
                <form onSubmit={sendMessage}>
                    <Grid container justify='center'>
                        <Grid item xs={8}>
                            <TextField
                                id='message'
                                label='Write here your message'
                                multiline
                                rowsMax={2}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={handleEnter}
                                fullWidth={true}
                                inputRef={input => input && input.focus()}
                            />
                        </Grid>
                        <Grid item md={3} className={classes.spacingAroundSm}>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth={true}>
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}