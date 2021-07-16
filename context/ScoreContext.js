import React, { useReducer } from "react";
import { ACTION_SET_ORDER, ACTION_SET_SCORE, ACTION_SET_CURRENT_SLIDE } from './scoreActions';

const initialState = {
  score: [],
  order: 0,
  currentSlide: {}
};

const scoreContext = React.createContext(initialState);
const { Provider } = scoreContext;

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_SET_SCORE: {
            return {
                ...state,
                score: action.payload
            };
        }

        case ACTION_SET_ORDER: {
            return {
                ...state,
                order: action.payload
            };
        }

        case ACTION_SET_CURRENT_SLIDE: {
            return {
                ...state,
                currentSlide: action.payload
            }
        }

        default: {
            return {
                ...state
            };
        }
    }
}

const ScoreProvider = ( { children } ) => {
    const [state,dispatch] = useReducer(reducer, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
}


export { scoreContext, ScoreProvider };