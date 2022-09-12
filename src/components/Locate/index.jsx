import { Box } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

import useStyles from "./styles.js";

function Locate({
  panTo,
  curMarker,
  setCurMarker,
  setListMarkerInput,
  setCenterChanged,
}) {
  const classes = useStyles();
  const [myLocation, setMyLocation] = useState(null);

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: Infinity,
  };

  const handleGetLocation = async () => {
    setCurMarker(null);
    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position?.coords.latitude},${position?.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        console.log({ res });

        console.log(position?.coords.latitude);
        console.log(position?.coords.longitude);

        // Set marker current for drag end
        const stringAddress = res?.data.results[0].formatted_address.split(",");

        setCurMarker({
          address: res?.data.results[0].formatted_address,
          name: stringAddress[0],
          ward: stringAddress[1],
          district: stringAddress[2],
          city: stringAddress[3],
          lat: position?.coords.latitude,
          lng: position?.coords.longitude,
          toUrl: `https://www.google.com/maps/?q=${position?.coords.latitude},${position?.coords.longitude}`,
          time: new Date(),
          status: "new",
          imgSabe:
            "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
        });
        setCenterChanged({
          lat: position?.coords.latitude,
          lng: position?.coords.longitude,
        });
      },
      () => null,
      options
    );
  };

  useEffect(() => {
    console.log("chim be huy");
    if (curMarker?.lat) {
      panTo({
        lat: curMarker?.lat,
        lng: curMarker?.lng,
      });
    }
  }, [curMarker?.lat]);
  return (
    <button
      className={classes.locate}
      onClick={() => {
        handleGetLocation();
        // panTo({
        //   lat: position?.coords.latitude,
        //   lng: position?.coords.longitude,
        // });
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
