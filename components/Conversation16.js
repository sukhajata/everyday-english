import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import styles from '../styles';
import settings from '../config/settings';

import SoundMedia from './SoundMedia';
import ButtonContine from './ButtonContinue';

const englishSpeaker = settings.firstLanguage === "en";

const Conversation16 = ({ slide, imageUrl, moveNextSlide }) => { 
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
        let newCards = [];
        slide.medias.forEach(media => {
            newCards.push({
                ...media,
                playing: false,
            })
        });
        setCards(newCards);
    }, [slide]);

    return (
        <React.Fragment>
            <Typography variant="body1" style={styles.info}>
                {englishSpeaker ? slide.english : slide.thai}
            </Typography>
            {cards && cards.map(media => (
                <Card key={media.id}
                    style={styles.defaultCard}
                >
                    <CardContent>
                        <Grid 
                            container 
                            direction="column"
                            justifyContent="flex-start"
                        >
                            <Grid item>
                                <Typography variant="body1">
                                    {englishSpeaker ? media.thai : media.english}
                                </Typography>
                                {settings.firstLanguage === 'en' &&
                                <Typography variant="body1">
                                    {media.phonetic}
                                </Typography>
                                }
                                <Typography variant="body1" color="primary">
                                    {englishSpeaker ? media.english : media.thai}
                                </Typography>
                                {media.literalTranslation && 
                                    <Typography variant="body1" color="textSecondary">
                                        ({media.literalTranslation})
                                    </Typography>
                                }
                                {media.notes  && 
                                    <Typography style={styles.notes}>
                                        {media.notes}
                                    </Typography>
                                }
                                <SoundMedia textToSpeak={englishSpeaker ? media.thai : media.english} audioFileName={media.audioFileName}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            <ButtonContine onClick={() => moveNextSlide(1)} />
        </React.Fragment>
    )
    
}

export default Conversation16;
