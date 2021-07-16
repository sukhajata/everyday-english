import React, { useState, useEffect } from 'react';

import MultiChoiceSlide from './MultiChoiceSlide';
import settings from '../config/settings';

const english = settings.firstLanguage === 'en';

const Listening18 = ({ slide, moveNextSlide }) => {
    const [target, setTarget] = useState();

    useEffect(() => {
        if (slide) {
            const _target = slide.medias.find(item => item.isTarget === "1");
            setTarget(_target);
        }
    }, [slide]);

    return (
        <>
        {slide && target &&
            <MultiChoiceSlide
                slide={slide}
                labelUpper=''
                labelLower=''
                textToSpeak={english ? target.thai : target.english}
                moveNextSlide={moveNextSlide}
                upperText={english ? "thai" : "english"}
                lowerText={english ? "phonetic" : ""}
            />
        }
        </>
    )
}

export default Listening18;
