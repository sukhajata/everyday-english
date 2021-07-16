import React from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

import { shuffle } from '../services/helpers';
import settings from '../config/settings';
import { textToSpeechEnglish, textToSpeechThai } from '../services/dbAccess';

class MatchingPairsText6 extends React.Component {

    state = {
        selectedFirstLanguage: null,
        selectedSecondLanguage: null,
        matched: 0,
        result: 0,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.slide.id !== prevState.slideId) {
            let cards = [];
            nextProps.slide.medias.forEach(media => {
                cards.push({
                    ...media,
                    className: nextProps.classes.defaultCard,
                })
            });
            
            shuffle(nextProps.slide.medias).forEach(media => {
                cards.push({
                    ...media,
                    className: nextProps.classes.defaultCard,
                });
            });
            
            return {
                cards,
                matched: 0,
                result: 0,
                slideId: nextProps.slide.id,
            }
        } else {
            return null;
        }
    }

    finishUp = () => {
        const result = this.state.result === -1 ? -1 : 1;
        this.props.moveNextSlide(result);    
        
    }

    selectFirstLanguage = index => {
        const { selectedSecondLanguage, matched } = this.state;
        const { correctCard, correctCardFade, wrongCard, defaultCard } = this.props.classes;
        let cards = this.state.cards.splice(0);
        if (selectedSecondLanguage) {
            if (selectedSecondLanguage === cards[index].id) {
                //fade out the matching pair
                cards = cards.map((card, idx) => {
                    if(card.id === selectedSecondLanguage || idx === index) {
                        card.className = correctCardFade;
                    } 
                    return card;
                });

                this.setState({
                    selectedFirstLanguage: null,
                    selectedSecondLanguage: null,
                    cards,
                });

                if (matched === 1) {
                    setTimeout(() => this.finishUp(), 200);
                } else {
                    this.setState({ matched: 1 });
                }

            } else {
                //show wrong colour then fade out
                cards[index].className = wrongCard;
                this.setState({
                    cards,
                    result: -1,
                });
                setTimeout(() => {
                    cards[index].className = defaultCard;
                    this.setState({
                        cards,
                    })
                }, 300);
                
            }
            
        } else {
            cards[index].className = correctCard;
            if (index === 2 && cards[3].className === correctCard) {
                cards[3].className = defaultCard;
            } else if (index === 3 && cards[2].className === correctCard) {
                cards[2].className = defaultCard;
            }
            this.setState({
                selectedFirstLanguage: cards[index].id,
                cards,
            });
        }
    }

    selectSecondLanguage = index => {
        if (settings.firstLanguage === 'en') {
            textToSpeechThai(this.state.cards[index].thai);
        } else {
            textToSpeechEnglish(this.state.cards[index].english);
        }
        const { selectedFirstLanguage, matched } = this.state;
        const { correctCard, correctCardFade, wrongCard, defaultCard } = this.props.classes;
        let cards = this.state.cards.splice(0);
        if (selectedFirstLanguage) {
            if (selectedFirstLanguage === cards[index].id) {
                cards = cards.map((card, idx) => {
                    if(card.id === selectedFirstLanguage || idx === index) {
                        card.className = correctCardFade;
                    } 
                    return card;
                });

                this.setState({
                    selectedFirstLanguage: null,
                    selectedSecondLanguage: null,
                    cards,
                });

                if (matched === 1) {
                    setTimeout(() => this.finishUp(), 200);
                } else {
                    this.setState({ matched: 1 });
                }
            } else {
                 //show wrong colour then fade out
                 cards[index].className = wrongCard;
                 this.setState({
                     cards,
                     result: -1,
                 });
 
                 setTimeout(() => {
                    cards[index].className = defaultCard;
                    this.setState({
                        cards,
                    })
                }, 300);
            }
          
        } else {
            cards[index].className = correctCard;
            if (index === 0 && cards[1].className === correctCard) {
                cards[1].className = defaultCard;
            } else if (index === 1 && cards[0].className === correctCard) {
                cards[0].className = defaultCard;
            }
            this.setState({
                selectedSecondLanguage: cards[index].id,
                cards,
            })
        }
    }

    render() {
        const { cards } = this.state;
        const { slide } = this.props;
        const english = settings.firstLanguage === 'en';

        return (
            <React.Fragment>
                <Typography variant="body1" style={{paddingTop: 5, paddingBottom: 5 }}>{slide.instructions}</Typography>
                {cards && 
                <React.Fragment>
                    <Card 
                        key="1"
                        className={cards[0].className}
                        onClick={() => this.selectSecondLanguage(0)}
                    >
                        <CardContent>
                            <Typography variant="body1" >
                                {english ? cards[0].thai : cards[0].english}<br/>
                                {english ? cards[0].phonetic : ''}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card 
                        key="2"
                        className={cards[1].className}
                        onClick={() => this.selectSecondLanguage(1)}
                    >
                        <CardContent>
                            <Typography variant="body1" >
                                {english ? cards[1].thai : cards[1].english}<br/>
                                {english ? cards[1].phonetic : ''}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Typography variant="h6" style={{ visibility: 'hidden'}}>
                        Too bad you won't see this!
                    </Typography>
                    <Card 
                        key="3"
                        className={cards[2].className}
                        onClick={() => this.selectFirstLanguage(2)}
                    >
                        <CardContent>
                            <Typography variant="body1" >
                                {english ? cards[2].english : cards[2].thai}<br/>
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card 
                        key="4"
                        className={cards[3].className}
                        onClick={() => this.selectFirstLanguage(3)}
                    >
                        <CardContent>
                            <Typography variant="body1" >
                                {english ? cards[3].english : cards[3].thai}<br/>
                            </Typography>
                        </CardContent>
                    </Card>
                </React.Fragment>
                }
            </React.Fragment>
        )

    }
}

export default withStyles(styles)(MatchingPairsText6);