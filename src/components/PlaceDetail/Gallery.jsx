import { Box, Button, Typography } from "@material-ui/core";
import React from "react";

import useStyles from "./styles.js";

function Gallery({ isOpen, selected, setIsOpenGallery }) {
  const classes = useStyles();

  return (
    <Box
      className={classes.galleryContainer}
      style={{ left: isOpen ? 0 : "-425px" }}
    >
      <Box className={classes.headerGallery}>
        <Button
          className={classes.backIcon}
          onClick={() => setIsOpenGallery(false)}
        >
          <img
            src="https://www.gstatic.com/images/icons/material/system_gm/1x/arrow_back_gm_grey_24dp.png"
            alt=""
          />
        </Button>
        <Typography variant="body1">
          {selected?.name ? selected?.name : ""}
        </Typography>
      </Box>

      <Box className={classes.contentGallery}>
        <Box className={classes.listImages}>
          {selected?.photos &&
            selected?.photos?.length > 0 &&
            selected?.photos.map((x, idx) => <img key={idx} src={x} />)}
        </Box>
      </Box>
    </Box>
  );
}

export default Gallery;
