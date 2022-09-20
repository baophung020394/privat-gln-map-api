import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";

import useStyles from "./styles.js";

function PlaceDetail({ isOpen, isClose, dragStart, selected }) {
  const classes = useStyles();

  return (
    <>
      <Box
        className={classes.placeContainer}
        style={{ left: isOpen ? "0px" : "-100%" }}
      >
        <Box className={classes.image}>
          {selected?.photos && selected?.photos?.length > 0 ? (
            <img src={selected?.photos ? selected?.photos[0] : ""} alt="" />
          ) : (
            <img
              src="https://maps.gstatic.com/tactile/pane/default_geocode-1x.png"
              alt=""
            />
          )}
        </Box>
        <Box className={classes.content}>
          <Box className={classes.top}>
            <img
              src={
                selected?.imgSave
                  ? selected?.imgSave
                  : "https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
              }
              className={classes.iconTitle}
            />
            <Typography variant="body1" className={classes.title}>
              {selected?.name ? selected?.name.split(",")[0] : <Skeleton width={310} />}
              <Typography
                variant="body1"
                component="span"
                className={classes.subTitle}
              >
                {selected?.nameCategory ? (
                  selected?.nameCategory
                ) : (
                  <Skeleton width={310} />
                )}
              </Typography>
            </Typography>
          </Box>

          {/* <Box className={classes.listImage}>
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
          </Box> */}
        </Box>

        <Box className={classes.content}>
          <ul className={classes.listContainer}>
            <>
              <li className={classes.item}>
                <img
                  src="https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png"
                  alt=""
                />
                {/* , ${selected?.ward}, ${selected?.district}, ${selected?.city} */}
                <Typography variant="body1">
                  {selected?.name ? (
                    `${selected?.name}`
                  ) : (
                    <Skeleton width={300} />
                  )}
                </Typography>
              </li>

              <li className={classes.item}>
                <img
                  src="https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png"
                  alt=""
                />
                <Typography variant="body1">
                  {selected?.plusCode ? (
                    selected?.plusCode
                  ) : (
                    <Skeleton width={300} />
                  )}
                </Typography>
              </li>

              <li className={classes.item}>
                <img
                  src="https://maps.gstatic.com/mapfiles/maps_lite/images/2x/ic_plus_code.png"
                  alt=""
                />
                <Typography variant="body1">
                  {selected?.placeId ? (
                    selected?.placeId
                  ) : (
                    <Skeleton width={300} />
                  )}
                </Typography>
              </li>
            </>
          </ul>
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
