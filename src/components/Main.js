import React, { useState } from 'react';
import ChatDrawer from '../components/ChatDrawer';
import Enter from '../components/Enter';

import { Container } from '@material-ui/core';


function Main() {
    const [isLoged, setLog] = useState(false);
    return (<Container fixed>
        {isLoged ?
            <ChatDrawer />:
            <Enter setLog={setLog} />}
    </Container>
    )
}
export default Main;