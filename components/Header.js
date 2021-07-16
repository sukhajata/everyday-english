import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from "@material-ui/core/Typography";


const Header = () => {
    const large = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:600px');

    const imgStyle = {
        width: large ? 150 : medium ? 100 : 60,
        marginBottom: large ? 30 : 20,
        marginTop: 10
    }
    const titleStyle = {
        width: large ? 518 : medium ? 400 : 300,
    }
    return (
        <AppBar
            position="relative"
            color="primary"
            style={{  color: "white" }}
        >
            <Toolbar>
                <Typography variant="h3" style={{ margin: 20 }}>Everyday English</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
