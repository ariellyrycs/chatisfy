import React, { useState } from 'react';
import { useAppContext } from '../context/store';
import { Button, Grid, Paper, FormControl, FormHelperText, InputLabel, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    spacing: {
        'margin-top': '20px',
        'margin-bottom': '20px'
    },
    fullHeight: {
        height: '100vh'
    }
});

function Enter({ setLog }) {
    const [nickName, setNickName] = useState('');

    const [error, setError] = useState('');

    const { state, dispatch } = useAppContext();

    const classes = useStyles();

    const procceed = (e) => {
        e.preventDefault();

        if (nickName.trim() === '') {
            setError('Should enter a valid nickName');
        } else {
            setLog(true);
            dispatch({ type: 'UPDATE_NICKNAME', nickName, sentBy: state.currentUser.id });
        }
        return false;
    };

    const handleEnter = e => {
        if (e.keyCode === 13 && !e.shiftKey) {
            procceed(e);
        }
        return false;
    };

    return (
        <Grid container justify='center' alignItems='center' className={classes.fullHeight}>
            <Grid item sm={6} md={3}>
                <Paper>
                    <form onSubmit={procceed}>
                        <Grid container justify='center' alignItems='center'>
                            <Grid item xs={10}>
                                <FormControl className={classes.spacing} fullWidth={true}>
                                    <InputLabel htmlFor='nickname-enter'>Enter your NickName</InputLabel>
                                    <Input
                                        id='nickname-enter'
                                        aria-describedby='Enter nickname'
                                        value={nickName}
                                        onChange={e => setNickName(e.target.value)}
                                        onKeyDown={handleEnter} />

                                    <FormHelperText
                                        id='nickname-enter-helper-text'
                                        error={true}
                                    >{error}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={10}>
                                <Button className={classes.spacing}
                                    id='enter-log'
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth={true}>
                                    Enter
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}
export default Enter;