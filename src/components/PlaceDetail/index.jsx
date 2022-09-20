import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { format } from "date-fns";

import useStyles from "./styles.js";

function PlaceDetail({ isOpen, isClose, dragStart, selected }) {
  const classes = useStyles();
  console.log(selected);
  // const sampleDate = new Date(selected?.openHours?.periods[0]?.open.hours);
  // const convertDate = format(sampleDate, "HH:mm");
  // console.log({ sampleDate });
  // console.log({ convertDate });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const openingHours = selected?.openHours?.periods
  //   .map((p) => ({
  //     day: p.open.day,
  //     time: `${p.open.time} - ${p.close.time}`,
  //   }))
  //   .reduce(
  //     (acc, current) => {
  //       let time = acc[current.day];
  //       time.push(current.time);
  //       return Object.assign([], acc, { [current.day]: time });
  //     },
  //     days.map((d) => [])
  //   )
  //   .map((p, index) => {
  //     const status = p.length == 0 ? "Closed" : p.join(" and ");
  //     return `${days[index]}: ${status}`;
  //   });

  // console.log(openingHours);

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
              {selected?.name ? selected?.name : <Skeleton width={310} />}
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
                  {selected?.address ? (
                    `${selected?.address}`
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

              {selected?.openHours?.weekdayText ? (
                <li className={`${classes.item} times`}>
                  <img
                    src="https://www.gstatic.com/images/icons/material/system_gm/1x/schedule_gm_blue_24dp.png"
                    alt=""
                  />
                  <Accordion className={classes.timesAccordion}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.timeAccordion}
                    >
                      <Typography className={classes.heading}>
                        <Typography
                          variant="body1"
                          component="span"
                          className={classes.text}
                        >
                          {selected?.openHours
                            ? selected?.openHours.isOpen
                            : ""}
                        </Typography>
                        <Typography
                          variant="body1"
                          component="span"
                          className={classes.timeText}
                        >
                          Opens
                        </Typography>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.weekdayTextContainer}>
                      {selected?.openHours &&
                        selected?.openHours.weekdayText &&
                        selected?.openHours?.weekdayText.map((x, idx) => (
                          <Typography
                            key={`${x}-${idx}`}
                            variant="body1"
                            className={classes.weekdayText}
                          >
                            {x}
                          </Typography>
                        ))}
                    </AccordionDetails>
                  </Accordion>
                </li>
              ) : null}

              <li className={classes.item}>
                <img
                  src="https://www.gstatic.com/images/icons/material/system_gm/1x/phone_gm_blue_24dp.png"
                  alt=""
                />
                <Typography variant="body1">
                  {selected?.phoneNumber ? (
                    selected?.phoneNumber
                  ) : (
                    <Skeleton width={300} />
                  )}
                </Typography>
              </li>

              <li className={classes.item}>
                <img
                  src="https://www.gstatic.com/images/icons/material/system_gm/1x/label_gm_blue_24dp.png"
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
