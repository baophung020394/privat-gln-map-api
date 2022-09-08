import { Box } from "@material-ui/core";
import React from "react";

import useStyles from "./styles.js";

function Locate({ panTo, setCurMarker }) {
  const classes = useStyles();

  return (
    <button
      className={classes.locate}
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position?.coords.latitude,
              lng: position?.coords.longitude,
            });
            setCurMarker({
              lat: position?.coords.latitude,
              lng: position?.coords.longitude,
              toUrl: `https://www.google.com/maps/?q=${position?.coords.latitude},${position?.coords.longitude}`,
              time: new Date(),
            });
          },
          () => null
        );
      }}
    >
      {/* <img
        src="https://www.freeiconspng.com/thumbs/compass-icon/compass-icon-27.png"
        alt="compass"
      /> */}
      <Box className={classes.btnLocation}>
        <Box className={classes.myLocation}></Box>
      </Box>
    </button>
  );
}

export default Locate;
