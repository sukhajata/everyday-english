import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = ({ height }) => {
  return (
    <Grid container style={{ height: height }}>
      <Grid item style={{ margin: "auto" }}>
        <CircularProgress size={70} />
      </Grid>
    </Grid>
  );
};

Loading.propTypes = {
  height: PropTypes.number
};

Loading.defaultProps = {
  height: 400 //window.innerHeight
};

export default Loading;
