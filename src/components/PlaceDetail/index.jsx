import { Box, Typography } from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import React, { useEffect, useRef, useState } from "react";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { format } from "date-fns";

import useStyles from "./styles.js";
import { currencyFormat } from "../../hooks/useFormatNumber.jsx";
import Schedule from "./Schedule.jsx";

function PlaceDetail({ isOpen, isClose, dragStart, selected }) {
  const classes = useStyles();
  const [listTime, setListTime] = useState([]);
  const [schedule, setSchedule] = useState({
    status: 0,
  });

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

  const renderTime = (scheduleObj) => {
    let stringTime = "";

    if (selected?.openHours?.isOpen === "Open") {
      stringTime = `Closes ${formatTime(scheduleObj?.close?.hours)}`;
      return (
        <Schedule
          stringTime={stringTime}
          selected={selected}
          status={schedule?.status}
        />
      );
    } else {
      stringTime = `Opens ${formatTime(scheduleObj?.open?.hours)}`;
      return (
        <Schedule
          stringTime={stringTime}
          selected={selected}
          status={schedule?.status}
        />
      );
    }
  };

  useEffect(() => {
    if (selected?.openHours?.weekdayText) {
      selected?.openHours?.periods?.forEach((x) => {
        const todayText = new Date(x.open.nextDate);
        const todayTextLocale = todayText.toLocaleString(
          `${navigator.language.slice(0, 2) === "vi" ? "vi" : "en"}`,
          { weekday: "long" }
        );

        if (todayTextLocale.includes(milisecondToday)) {
          setSchedule({
            ...schedule,
            open: x?.open,
            close: x?.close,
          });
        }
      });
    }

    const sortedArr = selected?.openHours?.weekdayText?.reduce(
      (acc, element) => {
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
                  <Accordion
                    className={classes.timesAccordion}
                    onChange={(e, expanded) => {
                      if (expanded) {
                        setSchedule({
                          ...schedule,
                          status: 1,
                        });
                      } else {
                        setSchedule({
                          ...schedule,
                          status: 0,
                        });
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.timeAccordion}
                    >
                      <Typography className={classes.heading}>
                        {renderTime(schedule)}
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
