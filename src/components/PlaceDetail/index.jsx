import { Box, Typography } from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { format } from "date-fns";

import useStyles from "./styles.js";
import { currencyFormat } from "../../hooks/useFormatNumber.jsx";

function PlaceDetail({ isOpen, isClose, dragStart, selected }) {
  const classes = useStyles();
  const [listTime, setListTime] = useState([]);
  const [schedule, setSchedule] = useState(null);

  // console.log(selected);
  const today = new Date();
  const milisecondToday = today.toLocaleString(
    `${navigator.language.slice(0, 2) === "vi" ? "vi" : "en"}`,
    { weekday: "long" }
  );

  const formatTime = (number) => {
    let ampm = number >= 12 ? "PM" : "AM";
    number = number % 12;
    number = number ? number : 12; // the hour '0' should be '12'
    let strTime = number + ampm;
    return strTime;
  };

  useEffect(() => {
    if (selected?.openHours?.weekdayText) {
      selected?.openHours?.periods?.forEach((x) => {
        const todayText = new Date(x.open.nextDate);
        const todayTextLocale = todayText.toLocaleString(
          `${navigator.language.slice(0, 2) === "vi" ? "vi" : "en"}`,
          { weekday: "long" }
        );

        if (
          todayTextLocale.includes(milisecondToday) &&
          selected?.openHours?.isOpen === "Open"
        ) {
          setSchedule({
            status: 0,
            time: x.close,
          });
        } else {
          setSchedule({
            status: 1,
            time: x.open,
          });
        }
      });
    }

    const sortedArr = selected?.openHours?.weekdayText?.reduce(
      (acc, element) => {
        // console.log({ acc });
        // console.log(element.split(","));
        if (element.split(":")[0].includes(milisecondToday)) {
          return [element, ...acc];
        }
        return [...acc, element];
      },
      []
    );
    setListTime(sortedArr);
  }, [selected?.openHours?.weekdayText]);

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
                className={classes.listStar}
              >
                {selected?.rating && selected?.rating > 0 && (
                  <>
                    <Typography
                      variant="body1"
                      component="span"
                      className={classes.numberStar}
                    >
                      {selected?.rating}
                    </Typography>
                    <Rating
                      name="half-rating-read"
                      value={
                        Math.floor(selected?.rating) / selected?.rating < 1
                          ? Math.floor(selected?.rating) + 0.5
                          : selected?.rating
                      }
                      defaultValue={
                        Math.floor(selected?.rating) / selected?.rating < 1
                          ? Math.floor(selected?.rating) + 0.5
                          : selected?.rating
                      }
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography
                      variant="body1"
                      component="span"
                      className={classes.reviewRating}
                    >
                      {currencyFormat(selected?.userRatingsTotal)}
                      {navigator && navigator?.language.slice(0, 2) === ""
                        ? " bài đánh giá"
                        : " reviews"}
                    </Typography>
                  </>
                )}
              </Typography>
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
        </Box>

        <Box className={classes.content}>
          <ul className={classes.listContainer}>
            <>
              <li className={classes.item}>
                <img
                  src="https://www.gstatic.com/images/icons/material/system_gm/1x/place_gm_blue_24dp.png"
                  alt=""
                />
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
                          className={`${classes.text} ${
                            selected?.openHours &&
                            selected?.openHours.isOpen === "Open"
                              ? "green"
                              : "red"
                          }`}
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
                          {schedule?.time && schedule?.time?.time !== "0000"
                            ? `${
                                schedule?.time?.status === 1
                                  ? `Close  ${formatTime(
                                      schedule?.time?.hours
                                    )}`
                                  : `Opens ${formatTime(schedule?.time?.hours)}`
                              } `
                            : `${
                                navigator.language.slice(0, 2) === "vi"
                                  ? " Mở cả ngày"
                                  : "Opens 24 hours"
                              }`}
                        </Typography>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.weekdayTextContainer}>
                      {listTime &&
                        listTime?.length > 0 &&
                        listTime.map((x, idx) => {
                          return (
                            <Typography
                              key={`${x}-${idx}`}
                              variant="body1"
                              className={`${classes.weekdayText} ${
                                x.split(":")[0].includes(milisecondToday)
                                  ? "active"
                                  : ""
                              }`}
                            >
                              {x}
                            </Typography>
                          );
                        })}
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
