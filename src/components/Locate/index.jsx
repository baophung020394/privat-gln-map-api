import { Box } from "@material-ui/core";
import React, { useEffect } from "react";

import useStyles from "./styles.js";

function Locate({ panTo, setCurMarker }) {
  const classes = useStyles();

  // const options = {
  //   enableHighAccuracy: false,
  //   timeout: 5000,
  //   maximumAge: 0,
  // };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       panTo({
  //         lat: position?.coords.latitude,
  //         lng: position?.coords.longitude,
  //       });
  //       setCurMarker({
  //         lat: position?.coords.latitude,
  //         lng: position?.coords.longitude,
  //         toUrl: `https://www.google.com/maps/?q=${position?.coords.latitude},${position?.coords.longitude}`,
  //         time: new Date(),
  //         status: "new",
  //         imgSave:
  //           "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
  //       });
  //     },
  //     () => null
  //     // options
  //   );
  // }, []);

  return (
    <button
      className={classes.locate}
      onClick={async () => {
        await navigator.geolocation.getCurrentPosition(
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
              status: "new",
              imgSave:
                "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
            });
          },
          () => null
          // options
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
