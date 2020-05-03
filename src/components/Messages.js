import React, { useRef, useLayoutEffect } from 'react';
import { useAppContext } from '../context/store';

import { Grid, Box, Fab, useScrollTrigger, Zoom } from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => {
    return {
        goDownButton: {
            position: 'absolute',
            right: '45px',
            bottom: '0px'
        },
        chatView: {
            height: 'calc(100vh - 204px)',
            overflow: 'scroll'
        },
        messageWrap: {
            backgroundColor: '#DCDCDC',
            margin: '1px 2px',
            padding: '2px 5px',
            borderRadius: '5px',
            maxWidth: '70%',
            float: 'left'
        },
        own: {
            backgroundColor: 'rgb(220, 248, 198)',
            float: 'right'
        },
        time: {
            color: 'grey',
            fontSize: '10px',
            textAlign: 'right'
        }
    }
});


const ScrollBottom = ({ children, container, bottonReference, chatRoomNode }) => {
    const classes = useStyles();
    const threshold = 100;
    const topTreshhold = useScrollTrigger({
        target: container,
        threshold: threshold
    });
    //This needs to be done to revert the orientation of useScrollTrigger
    const bottomTreshhold = !topTreshhold && container && chatRoomNode.offsetHeight > container.offsetHeight + threshold;

    const handleClick = () => {
        bottonReference.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    };

    return (
        <Zoom in={bottomTreshhold}>
            <div onClick={handleClick} role='presentation' className={classes.goDownButton}>
                {children}
            </div>
        </Zoom>
    );
}

function MessagesContainer({ currentMessages, chatRoomNode, classes, currentUser, users }) {
    return (
        <Grid container justify='center' alignContent='flex-start' ref={chatRoomNode}>
            {currentMessages.map((message) =>
                <Grid key={message.id} item xs={11}>
                    <div className={clsx(classes.messageWrap, message.own ? classes.own : '')}>
                        <Box component='span'>{message.own ? currentUser.nickName : users.data[message.from].nickName}</Box>
                        <Box>{message.content}</Box>
                        <div className={classes.time}><time>{message.createdTime}</time></div>
                    </div>
                </Grid>
            )}
        </Grid>
    )
}

export default function Messages({ currentMessagesIds }) {
    const chatRoomNode = useRef();
    const { state } = useAppContext();
    const currentMessages = currentMessagesIds.map(id => state.messages.data[id]);
    const classes = useStyles();
    const container = useRef();
    const bottonReference = useRef();

    useLayoutEffect(() => {
        //This has to be done this way because because delays 
        bottonReference.current.scrollIntoView({ block: 'center' });
    }, [currentMessagesIds]);

    return (
        <div ref={container} className={classes.chatView}>
            <MessagesContainer
                classes={classes}
                chatRoomNode={chatRoomNode}
                currentMessages={currentMessages}
                currentUser={state.currentUser}
                users={state.users}
            />
            <ScrollBottom
                container={container.current}
                bottonReference={bottonReference.current}
                chatRoomNode={chatRoomNode.current}>
                <Fab color='secondary' size='small' aria-label='scroll down'>
                    <KeyboardArrowDownIcon />
                </Fab>
            </ScrollBottom>
            <div ref={bottonReference} />
        </div>
    );
}