import React, { useEffect, useState, useContext } from 'react';
import { lighten, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import colors from '../styles/colors';
import { scoreContext } from "../context/ScoreContext";

/*
const classes = {
    root: {
      height: 20,
      backgroundColor: lighten(colors.blue, 0.7),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: colors.blue,
    },
  };*/

const LessonProgress = () => {
    const { state } = useContext(scoreContext);
    const { order, score } = state;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      setProgress(order / score.length * 100);
    }, [score,order])
    //console.log(`total = ${score.length}, order = ${order}, progress = ${progress}`);
    
    return (
        <LinearProgress
            style={{ height: 20 }}
            variant="determinate"
            color="primary"
            value={progress}
        />
    )
}


export default LessonProgress;
