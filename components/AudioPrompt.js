import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import settings from '../config/settings';
import { textToSpeechEnglish, textToSpeechThai } from '../services/dbAccess';
import SoundMedia from './SoundMedia';

const AudioPrompt = ({   
    audioFileName,
    textToSpeak,
    instructions,
    labelUpper,
    labelLower,
    extra }) => {
        
    const [oldTextToSpeak, setOldTextToSpeak] = useState();

    useEffect(() => {
        if (textToSpeak && textToSpeak != oldTextToSpeak) {
            setOldTextToSpeak(textToSpeak);
            if (settings.firstLanguage === 'en') {
                textToSpeechThai(textToSpeak);
            } else {
                textToSpeechEnglish(textToSpeak);
            }    

        } 
        
    },[textToSpeak]);
    
    return (
        <>
            <Typography variant="body1" style={{paddingTop: 5, paddingBottom: 5 }}>{instructions}</Typography>
            <Grid container direction="row" spacing={2} style={{ marginBottom: 10 }}>
                <Grid item>
                    <SoundMedia textToSpeak={textToSpeak} audioFileName={audioFileName} />
                </Grid>
                <Grid item>
                    <Grid container direction="column">
                        <Typography variant="body1">
                            {labelUpper}
                        </Typography>
                        {labelLower && <Typography variant="body1">{labelLower}</Typography>}
                        {extra && <Typography variant="body1" color="primary">{extra}</Typography>}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
    
}

export default AudioPrompt;

