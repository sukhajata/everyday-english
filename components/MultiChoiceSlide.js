import React, { useState, useEffect  } from 'react';

import TextOption from './TextOption';
import AudioPrompt from './AudioPrompt';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import { shuffle, checkCase } from '../services/helpers';

const MultiChoiceSlide = ({ slide, target, moveNextSlide, labelUpper, labelLower, textToSpeak, extra, upperText, lowerText }) => { 
    const [cards, setCards] = useState([]);
    const [result, setResult] = useState(0);

    useEffect(() => {
        if (slide) {
            const newCards = shuffle(slide.medias).map(media => {
                return {
                    ...media, 
                    style: styles.defaultCard
                }
            });
           
            setCards(newCards);
            setResult(0);
        } 
    }, [slide]);

    const selectCorrect = id => {
        const newCards = cards.map(card => {
            if (card.id == id) {
                card.style = styles.correctCard;
            }
            return card;
        });
        
        setCards(newCards);

        setTimeout(() => {
            const _result = result === -1 ? -1 : 1;
            moveNextSlide(_result);
        }, 400);
    }

    const selectWrong = id => {
        const newCards = cards.map(card => {
            if (card.id == id) {
                card.style = styles.wrongCard;
            }
            return card;
        });

        setCards(newCards);
        setResult(-1);
    }


    return (
        <>
            {slide && cards &&
            <>
                <AudioPrompt 
                    audioFileName={slide.audioFileName}
                    textToSpeak={textToSpeak}
                    instructions={slide.instructions}
                    labelUpper={labelUpper}
                    labelLower={labelLower}
                    extra={extra}
                    target={target}
                />
                {cards.map(media => (
                <TextOption
                    key={media.id}
                    media={media}
                    onClick={media.isTarget === "1" ? () => selectCorrect(media.id) : () => selectWrong(media.id) }
                    style={media.style}
                    upperText={upperText === "english" ? checkCase(media.english) : media.thai} 
                    lowerText={lowerText === undefined ? undefined : media.phonetic }
                />
                ))}
            </>
            }
        </>
        
    )
    
}

export default withStyles(styles)(MultiChoiceSlide);