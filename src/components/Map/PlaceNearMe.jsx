import { Box, Button, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import PlaceDetailNearMe from "./PlaceDetailNearMe.jsx";

import useStyles from "./styles.js";

const PlaceNearMe = forwardRef(
  (
    { isOpen, setIsOpenListNear, setNearByMe, setIsCloseNear, listPlaces },
    ref
  ) => {
    const classes = useStyles();
    console.log({ isOpen });
    return (
      <Box
        className={classes.nearMeContainer}
        style={{ left: isOpen ? 0 : "-425px" }}
      >
        <Box className={classes.headerNearMe}>
          <Button
            className={classes.backIcon}
            onClick={() => {
              setIsOpenListNear(false);
              setNearByMe([]);
              setIsCloseNear(false);
            }}
          >
            <img
              src="https://www.gstatic.com/images/icons/material/system_gm/1x/arrow_back_gm_grey_24dp.png"
              alt=""
            />
          </Button>
          <Typography variant="body1"></Typography>
        </Box>

        <Box className={classes.contentPlaces}>
          <PlaceDetailNearMe listPlaces={listPlaces} ref={ref} />
        </Box>
      </Box>
    );
  }
);

export default PlaceNearMe;
