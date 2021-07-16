import React from 'react';
import { ScoreProvider } from '../context/ScoreContext';
import '../styles/globals.css'

const Application = ({ Component, pageProps }) => (
    <ScoreProvider>
        <Component {...pageProps}/>
    </ScoreProvider>
);

export default Application;