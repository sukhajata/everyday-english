import React, { useState, useEffect, useContext } from 'react';
import Router from 'next/router';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import styles from '../styles';
import { getLanguage } from '../services/dbAccess';
import ButtonContinue from '../components/ButtonContinue';
import { scoreContext } from '../context/ScoreContext';

const Totals = ({  }) => {
    const { state } = useContext(scoreContext);
    const { score } = state;

    const language = getLanguage();
    const [result, setResult] = useState();

    useEffect(() => {
        if (score){
            const _result = score.filter(item => item === 1);
            setResult(_result);
        }
    },[score])

    return (
        <Container maxWidth="sm">
            {result && 
            <Grid container direction="column" style={{ marginTop: 50 }}>
                <Grid item>
                    <Typography variant="h6">
                        {language.wellDone}
                    </Typography>
                </Grid>
                <Grid item>
                    <Chip 
                        style={styles.totals}
                        label={result.length + " / " + score.length}
                    />
                </Grid>
                <Grid item>
                    <ButtonContinue
                        onClick={() => Router.push('/')}
                    />
                </Grid>
            </Grid>
            }
        </Container>
    )
        
}

export default Totals;
