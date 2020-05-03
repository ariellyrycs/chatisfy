import React, { useState } from 'react';

import Enter from '../components/Enter';

import { Container } from '@material-ui/core';


function Main() {
    const [isLoged, setLog] = useState(false);
    return (<Container fixed>
        {isLoged ?<>
            < />:
            <Enter setLog={setLog} />}
    </Container>
    )
}
export default Main;