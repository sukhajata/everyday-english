import React from 'react';

import Chip from '@material-ui/core/Chip';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import AudioPrompt from './AudioPrompt';

import { shuffle } from '../services/helpers';
import settings from '../config/settings';

const englishSpeaker = settings.firstLanguage === "en";

class Bingo15 extends React.Component {

    state = {
        chips: [],
        target: null,
        slideId: 0,
        result: 0,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.slide.id !== prevState.slideId) {

            const chips = shuffle(nextProps.slide.medias).map(media => {
                return {
                    ...media,
                    className: nextProps.classes.defaultChip,
                }
            })
            const _target = nextProps.slide.medias.find(item => item.isTarget === 1);
            
            return {
                chips,
                target: _target,
                slideId: nextProps.slide.id,
                result: 0,
            }
            
        } else {
            return null;
        }
    }

    handleChipClick = media => {
        if (media.id === this.state.target.id) {
            const result = this.state.result === 0 ? 1 : -1;
            this.props.moveNextSlide(result);
        } else {
            this.setState({
                result: -1,
            })
        }
    }

    render() {
        const { slide } = this.props;
        const { target, chips } = this.state;
        console.log(target);

        return (
            <React.Fragment>
                <AudioPrompt 
                    textToSpeak={englishSpeaker ? target.thai : target.english}
                    audioFileName={slide.audioFileName}
                    instructions={slide.instructions}
                    labelUpper={englishSpeaker ? target.english : target.thai}
                />
                {chips.map(item =>
                    <Chip key={item.id}
                        className={item.className}
                        variant="outlined"
                        label={englishSpeaker ? item.thai + ' ' + item.phonetic : item.english}
                        onClick={() => this.handleChipClick(item)}
                    />
                )}
            
            </React.Fragment>
    
        )
    }
}

export default withStyles(styles)(Bingo15);