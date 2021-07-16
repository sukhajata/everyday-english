import React, { useState, useEffect } from 'react';
import Mood from '@material-ui/icons/Mood';
import MoodBad from '@material-ui/icons/MoodBad';

import styles from '../styles';
import AudioPrompt from './AudioPrompt';
import { shuffle } from '../services/helpers';
import settings from '../config/settings';

const MultipleChoiceImage1 = ({ slide, moveNextSlide, imageUrl }) => { 
    const [images, setImages] = useState([]);
    const [result, setResult] = useState(0);
    const english = settings.firstLanguage === 'en';
    const [target, setTarget] = useState();

    useEffect(() => {
        if (slide) {
            const _images = shuffle(slide.medias).map(media => {
                return {
                    ...media,
                    correct: false,
                    wrong: false,
                }
            });
            setImages(_images);
            const _target = slide.medias.find(item => item.isTarget === "1");
            setTarget(_target);
            setResult(0);
        }
    }, [slide])

    const selectCorrect = id => {
        const newImages = images.map(image => {
            if (image.id === id) {
                image.correct = true;
            }
            return image;
        });
        
        setImages(newImages);
        setTimeout(() => {
            const _result = result === -1 ? -1 : 1;
            moveNextSlide(_result);
        }, 400);
    }

    const selectWrong = id => {
        const newImages = images.map(image => {
            if (image.id === id) {
                image.wrong = true;
            }
            return image;
        });
        
        setImages(newImages);
        setResult(-1);
    }

    return (
        <>
        {slide && target && 
            <>
                <AudioPrompt 
                    audioFileName={slide.audioFileName}
                    textToSpeak={english ? target.thai : target.english}
                    instructions={slide.instructions}
                    labelUpper={english ? target.thai : target.english}
                    labelLower={english ? target.phonetic : ''}
                />
                {images.map(image => 
                    <>
                    {image.correct &&
                        <div key={image.id} style={{ position: 'relative' }}>
                            <img 
                                alt="" 
                                style={styles.imageBlur}  
                                src={imageUrl + image.imageFileName}
                            /> 
                            <div style={styles.middle}>
                                <Mood style={styles.correctIcon} />
                            </div>
                        </div>
                    }
                    {image.wrong &&
                        <div key={image.id} style={{ position: 'relative' }}>
                            <img 
                                alt="" 
                                style={styles.imageBlur}  
                                src={imageUrl + image.imageFileName}
                            /> 
                            <div style={styles.middle}>
                                <Mood style={styles.wrongIcon} />
                            </div>
                        </div>
                    }
                    {!image.correct && !image.wrong &&
                        <div key={image.id} style={{ position: 'relative' }}>
                            <img 
                                alt="" 
                                style={styles.imageFit}
                                onClick={image.isTarget === "1" ? 
                                    () => selectCorrect(image.id) :
                                    () => selectWrong(image.id)
                                }
                                src={imageUrl + image.imageFileName}
                            /> 
                        </div>
                    }
                    </>
                )}
            </>
        }
        </>
    )
    
}

export default MultipleChoiceImage1;

/*
 <table className={styles.imageTable} align="center">
                <tbody>
                {images.map(image => 
                    <tr key={image.id}>
                    {image.correct &&
                        <td style={{ position: 'relative' }}>
                            <img 
                                alt="" 
                                className={styles.imageBlur}  
                                src={imageUrl + image.imageFileName}
                            /> 
                            <div className={styles.middle}>
                                <Mood className={styles.correctIcon} />
                            </div>
                        </td>
                    }
                    {image.wrong &&
                        <td style={{ position: 'relative' }}>
                            <img 
                                alt="" 
                                className={styles.imageBlur}  
                                src={imageUrl + image.imageFileName}
                            /> 
                            <div className={styles.middle}>
                                <MoodBad className={styles.wrongIcon} />
                            </div>
                        </td>
                    }   
                    {!image.wrong && !image.correct &&
                        <td >
                            <img 
                                alt="" 
                                className={styles.imageFit}  
                                onClick={image.isTarget === "1" ? 
                                    () => selectCorrect(image.id) :
                                    () => selectWrong(image.id)
                                }
                                src={imageUrl + image.imageFileName}
                            /> 
                        </td>
                    }
                    </tr>   
                )}
                </tbody>
            </table>
            */