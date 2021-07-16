import React from 'react';
import Button from '@material-ui/core/Button';

import colors from '../styles/colors';
import { getLanguage } from '../services/dbAccess';

const ButtonContinue = ({ onClick, disabled }) => {
    const style = disabled ? {
        color: colors.lightGray, marginTop: 15
    } : {
        color: colors.green, marginTop: 15
    }

    return (
        <Button 
            variant="outlined" 
            style={style}
            disabled={disabled}
            onClick={onClick}
        >
            {getLanguage().continue}
        </Button>
    )
}

export default ButtonContinue;