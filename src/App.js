import React from 'react';
import Main from './components/Main';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    width: '100%'
  }
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Main />

    </div>
  );
}

export default App;
