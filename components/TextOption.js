import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

function TextOption ({ onClick, style, upperText, lowerText }) {
    return (
        <Card
            style={style}
            onClick={onClick}
        >
            <CardContent>
                <Typography variant="body1">
                    {upperText}<br/>
                    {lowerText}
                </Typography>
            </CardContent>
        </Card>
    )
}


export default TextOption;