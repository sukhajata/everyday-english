import React, { useEffect, useState } from 'react';

import MultiChoiceSlide from './MultiChoiceSlide';
import settings from '../config/settings';


const MissingWord3 = ({ slide, moveNextSlide }) => { 
    const english = settings.firstLanguage === 'en';
    const [textToSpeak, setTextToSpeak] = useState();
    const [sentence, setSentence] = useState();
    const [target, setTarget] = useState();

    useEffect(() => {
        if (slide) {
            const _target = slide.medias.find(item => item.isTarget === "1");

            let _sentence, _textToSpeak;
            if (english) {
                const start = slide.thai.indexOf('_');
                const end = start + 6;
                _sentence = slide.thai.substring(0, slide.thai.indexOf('('));
                _textToSpeak = _sentence.substring(0, start) + _target.thai + _sentence.substring(end);
            } else {
                const start = slide.english.indexOf('_');
                const end = start + 6;
                _sentence= slide.english.substring(0, slide.english.indexOf('('));
                _textToSpeak = _sentence.substring(0, start) + _target.english + _sentence.substring(end);
            }
            setTarget(_target);
            setSentence(_sentence);
            setTextToSpeak(_textToSpeak);
        }
    }, [slide]);
  
    
    return (
        <>
        {target && sentence && textToSpeak &&
            <MultiChoiceSlide
                slide={slide}
                textToSpeak={textToSpeak}
                labelUpper={sentence}
                labelLower={english ? slide.phonetic.substring(0, slide.phonetic.indexOf('(')) : ''}
                extra={english ? slide.english : slide.thai}
                moveNextSlide={moveNextSlide}
                upperText={english ? "thai" : "english" }
                lowerText={english ? "phonetic" : ""}
        />
        }
        </>
    )
    
}

export default MissingWord3;