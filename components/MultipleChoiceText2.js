import React, { useState, useEffect } from 'react';

import MultiChoiceSlide from './MultiChoiceSlide';
import settings from '../config/settings';

export default function MultipleChoiceText2 ({ slide, moveNextSlide }) { 
    const english = settings.firstLanguage === 'en';
    const [target, setTarget] = useState();

    useEffect(() => {
        const _target = slide.medias.find(item => item.isTarget === "1");
        setTarget(_target);
    }, [slide])

    return (
        <>
        {slide && target &&
            <MultiChoiceSlide
                slide={slide}
                textToSpeak={english ? target.thai : target.english}
                labelUpper={english ? target.thai : target.english}
                labelLower={english ? target.phonetic : ''}
                extra={english ? slide.english : ''}
                moveNextSlide={moveNextSlide}
                upperText={english ? "english" : "thai"}
            />     
        }       
        </>
    )
    
}
