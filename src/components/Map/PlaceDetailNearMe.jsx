import { Box, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { forwardRef } from "react";
import { currencyFormat } from "../../hooks/useFormatNumber.jsx";
import useStyles from "./styles.js";

const PlaceDetailNearMe = forwardRef(({ listPlaces }, ref) => {
  const classes = useStyles();
  let listFilterPlaces = listPlaces;

  //   const renderPlaceDetail = (placeId, idx) => {
  //     const request = {
  //       placeId: placeId,
  //     };
  //     const service = new google.maps.places.PlacesService(
  //       ref.current
  //     ); /*global google*/
  //     service.getDetails(request, function (place, status) {
  //       if (
  //         status ===
  //           google.maps.places.PlacesServiceStatus.OK /*global google*/ &&
  //         place
  //       ) {
  //         console.log(place);
  //         // let listPhoto = [];
  //         if (place?.photos) {
  //           //   listFilterPlaces[idx]?.photos.push(place?.photos[0].getUrl());
  //         }
  //       }
  //     });
  //   };

  return (
    <Box className={classes.placeDetailNearMe}>
      <Box className={classes.listPlacesDetail}>
        {listFilterPlaces?.length > 0 &&
          listFilterPlaces?.map((x, idx) => {
            return (
              <Box className={classes.placeDetail} key={`${x?.lng}-${idx}`}>
                <Box className={classes.leftPlaceDetail}>
                  <Typography variant="body1" component="h2">
                    {x?.name}
                  </Typography>
                  <Box className="rating">
                    <Typography
                      variant="body1"
                      component="span"
                      className="number"
                    >
                      {x?.rating}
                    </Typography>

                    {x?.rating && (
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
                        className="ratingstar"
                      />
                    )}

                    <Typography
                      variant="body1"
                      component="span"
                      className="number"
                    >
                      {x?.userRating
                        ? `(${currencyFormat(x?.userRating)})`
                        : null}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    component="span"
                    className="number"
                  >
                    {x?.vicinity ? x?.vicinity : ""}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="p"
                    className={`openTime ${
                      x?.openHours && x?.openHours?.isOpen === "Open"
                        ? "green"
                        : "red"
                    }`}
                  >
                    {x?.openHours ? x?.openHours?.isOpen : ""}
                  </Typography>
                </Box>
                <Box className={classes.rightPlaceDetail}>
                  <img
                    src={
                      x?.photos
                        ? x?.photos
                        : "https://maps.gstatic.com/tactile/pane/default_geocode-1x.png"
                    }
                    alt=""
                  />
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
});
export default PlaceDetailNearMe;
