import { Box, Typography } from "@material-ui/core";
import React from "react";

import useStyles from "./styles.js";

function PlaceDetail({ img, address, phone, lng, lat, isOpen, isClose }) {
  const classes = useStyles();

  return (
    <>
      <Box
        className={classes.placeContainer}
        style={{ left: isOpen ? "0px" : "-100%" }}
      >
        <Box className={classes.image}>
          <img src="https://placehold.jp/600x600.png" alt="" />
        </Box>
        <Box className={classes.content}>
          <Box className={classes.top}>
            <Typography variant="body1" className={classes.title}>
              {address ? address : ""}
            </Typography>

            <Typography variant="body1" className={classes.location}>
              Lng: {lng ? lng : ""}
            </Typography>

            <Typography variant="body1" className={classes.location}>
              Lat: {lat ? lat : ""}
            </Typography>
          </Box>

          <Box className={classes.listImage}>
            <img src="https://placehold.jp/70x70.png" alt="" />
            <img src="https://placehold.jp/70x70.png" alt="" />
            <img src="https://placehold.jp/70x70.png" alt="" />
            <img src="https://placehold.jp/70x70.png" alt="" />
            <img src="https://placehold.jp/70x70.png" alt="" />
            <img src="https://placehold.jp/70x70.png" alt="" />
            <img src="https://placehold.jp/70x70.png" alt="" />
            <img src="https://placehold.jp/70x70.png" alt="" />
          </Box>

          <Box className={classes.bot}>
            <span className={classes.botItem}>
              <img
                src="https://vietgiao.edu.vn/wp-content/uploads/2019/10/contact-page-for-flatsome-wordpress-theme-pointed-icon-phone.png"
                alt=""
              />
            </span>
            <span className={classes.botItem}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1380/1380370.png"
                alt=""
              />
            </span>
            <span className={classes.botItem}>
              <img
                src="http://cdn.onlinewebfonts.com/svg/img_93271.png"
                alt=""
              />
            </span>
            <span className={classes.botItem}>
              <img
                src="https://cdn.iconscout.com/icon/free/png-256/share-2315658-1921380.png"
                alt=""
              />
            </span>
          </Box>
        </Box>
      </Box>
      {/* <Box
        className={classes.layer}
        onClick={isClose}
        style={{ display: isOpen ? "block" : "none" }}
      ></Box> */}
    </>
  );
}

export default PlaceDetail;
