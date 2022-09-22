import { Avatar, Box, Button, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { currencyFormat } from "../../hooks/useFormatNumber.jsx";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import useStyles from "./styles.js";

function relativeDays(timestamp) {
  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  const oneDayInMs = 1000 * 60 * 60 * 24;
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / oneDayInMs
  );

  return rtf.format(daysDifference, "day");
}

function RatingDetail({ isOpen, selected, setIsOpenRatingDetail }) {
  const classes = useStyles();

  // console.log({ selected });
  // console.log(selected?.rating);
  return (
    <Box
      className={classes.galleryContainer}
      style={{ left: isOpen ? 0 : "-425px" }}
    >
      <Box className={classes.headerGallery}>
        <Button
          className={classes.backIcon}
          onClick={() => setIsOpenRatingDetail(false)}
        >
          <img
            src="https://www.gstatic.com/images/icons/material/system_gm/1x/arrow_back_gm_grey_24dp.png"
            alt=""
          />
        </Button>
        <Typography variant="body1">All reviews</Typography>
      </Box>

      <Box className={classes.contentReviews}>
        <Box className={classes.reviewPoint}>
          <Box className={classes.leftPoint}>
            <Box className="itemPoint">
              <Typography variant="body1" component="span">
                5
              </Typography>
              <Box className={classes.progressbars} style={{ width: 225 }}>
                <Box
                  className={classes.progressbar}
                  style={{ width: "100%" }}
                ></Box>
              </Box>
            </Box>
            <Box className="itemPoint">
              <Typography variant="body1" component="span">
                4
              </Typography>
              <Box className={classes.progressbars} style={{ width: 225 }}>
                <Box
                  className={classes.progressbar}
                  style={{ width: "80%" }}
                ></Box>
              </Box>
            </Box>
            <Box className="itemPoint">
              <Typography variant="body1" component="span">
                3
              </Typography>
              <Box className={classes.progressbars} style={{ width: 225 }}>
                <Box
                  className={classes.progressbar}
                  style={{ width: "60%" }}
                ></Box>
              </Box>
            </Box>
            <Box className="itemPoint">
              <Typography variant="body1" component="span">
                2
              </Typography>
              <Box className={classes.progressbars} style={{ width: 225 }}>
                <Box
                  className={classes.progressbar}
                  style={{ width: "30%" }}
                ></Box>
              </Box>
            </Box>
            <Box className="itemPoint">
              <Typography variant="body1" component="span">
                1
              </Typography>
              <Box className={classes.progressbars} style={{ width: 225 }}>
                <Box
                  className={classes.progressbar}
                  style={{ width: "10%" }}
                ></Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.rightPoint}>
            {selected?.rating && (
              <>
                <Typography variant="body1" component="h1">
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
              </>
            )}
            <Typography
              variant="body1"
              component="span"
              className={classes.textReviewPoint}
            >
              {currencyFormat(selected?.userRatingsTotal)} reviews
            </Typography>
          </Box>
        </Box>

        <Box className={classes.listReviews}>
          {selected?.reviews &&
            selected?.reviews.map((x, idx) => {
              return (
                <Box className={classes.userReview} key={idx}>
                  <Box className={classes.heading}>
                    <Box className="left">
                      <Avatar
                        className="avatar"
                        alt={x?.author_name}
                        src={x?.profile_photo_url}
                      />
                    </Box>
                    <Box className="right">
                      <a href={x?.author_url} target="_blank">
                        <Typography className="name" variant="body1">
                          {x?.author_name}
                        </Typography>
                      </a>
                    </Box>
                  </Box>
                  <Box className={classes.timeRating}>
                    <Rating
                      name="half-rating-read"
                      value={
                        Math.floor(x?.rating) / x?.rating < 1
                          ? Math.floor(x?.rating) + 0.5
                          : x?.rating
                      }
                      defaultValue={
                        Math.floor(x?.rating) / x?.rating < 1
                          ? Math.floor(x?.rating) + 0.5
                          : x?.rating
                      }
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body1" className="timeago">
                      {x?.relative_time_description}
                    </Typography>
                  </Box>

                  <Box className={classes.contentReivew}>
                    <Typography variant="body1">{x?.text}</Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
}

export default RatingDetail;
