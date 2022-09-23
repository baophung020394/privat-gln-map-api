import { Box } from "@material-ui/core";
import axios from "axios";
import React, { forwardRef, useEffect, useState } from "react";

import useStyles from "./styles.js";

const Locate = forwardRef(
  (
    { panTo, curMarker, setCurMarker, setListMarkerInput, setCenterChanged },
    ref
  ) => {
    const classes = useStyles();
    const [myLocation, setMyLocation] = useState(null);

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    const handleGetLocation = async () => {
      ref.current.setZoom(15);
      setCurMarker(null);
      await navigator.geolocation.getCurrentPosition(
        async (position) => {
          const res = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position?.coords.latitude},${position?.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
          );

          const request = {
            placeId: res?.data.results[0]?.place_id,
          };

          const service = new google.maps.places.PlacesService(
            ref.current
          ); /*global google*/

          service.getDetails(request, function (place, status) {
            if (
              status ===
                google.maps.places.PlacesServiceStatus.OK /*global google*/ &&
              place &&
              place.geometry &&
              place.geometry.location
            ) {
              let listPhoto = [];
              if (place?.photos) {
                place?.photos.forEach((x) => listPhoto.push(x.getUrl()));
              }

              // Set marker current for drag end
              const stringAddress =
                res?.data.results[0].formatted_address.split(",");

              setCurMarker({
                address: res?.data.results[0].formatted_address,
                name: place?.name,
                ward: stringAddress[1],
                district: stringAddress[2],
                city: stringAddress[3],
                lat: position?.coords.latitude,
                lng: position?.coords.longitude,
                plusCode: res?.data.plus_code
                  ? res?.data.plus_code.compound_code
                  : "No plus code",
                placeId: res?.data.results[0]
                  ? res?.data.results[0].place_id
                  : "No place id",
                photos: listPhoto,
                photos: place?.reviews,
                openHours: {
                  isOpen: place?.opening_hours?.isOpen() ? "Open" : "Close",
                  weekdayText: place?.opening_hours?.weekday_text,
                  periods: place?.opening_hours?.periods,
                },
                phoneNumber: place?.formatted_phone_number
                  ? place?.formatted_phone_number
                  : "No phone number",
                rating: place?.rating,
                website: place?.website ? place?.website : "No website",
                icons: {
                  icon: place?.icon,
                  url: place?.icon_mask_base_uri,
                  backgroundColor: place?.icon_background_color,
                },
                userRatingsTotal: place?.user_ratings_total,
                nameCategory: "...",
                toUrl: `https://www.google.com/maps/?q=${position?.coords.latitude},${position?.coords.longitude}`,
                time: new Date(),
                status: "new",
                imgSave: "",
              });
            }
          });

          ref.current.setZoom(15);
          ref.current.panTo({
            lat: position?.coords.latitude,
            lng: position?.coords.longitude,
          });

          // setCenterChanged({
          //   lat: position?.coords.latitude,
          //   lng: position?.coords.longitude,
          // });
        },
        () => null,
        options
      );
    };

    useEffect(() => {
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
);

// function Locate({
//   panTo,
//   curMarker,
//   setCurMarker,
//   setListMarkerInput,
//   setCenterChanged,
// }) {
//   const classes = useStyles();
//   const [myLocation, setMyLocation] = useState(null);

//   const options = {
//     enableHighAccuracy: false,
//     timeout: 5000,
//     maximumAge: Infinity,
//   };

//   const handleGetLocation = async () => {
//     setCurMarker(null);
//     await navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const res = await axios.get(
//           `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position?.coords.latitude},${position?.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
//         );

//         // Set marker current for drag end
//         const stringAddress = res?.data.results[0].formatted_address.split(",");

//         setCurMarker({
//           address: res?.data.results[0].formatted_address,
//           name: stringAddress[0],
//           ward: stringAddress[1],
//           district: stringAddress[2],
//           city: stringAddress[3],
//           lat: position?.coords.latitude,
//           lng: position?.coords.longitude,
//           plusCode: res?.data.plus_code.compound_code,
//           placeId: res?.data.results[0].place_id,
//           toUrl: `https://www.google.com/maps/?q=${position?.coords.latitude},${position?.coords.longitude}`,
//           time: new Date(),
//           status: "new",
//           imgSabe:
//             "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
//         });
//         setCenterChanged({
//           lat: position?.coords.latitude,
//           lng: position?.coords.longitude,
//         });
//       },
//       () => null,
//       options
//     );
//   };

//   useEffect(() => {
//     if (curMarker?.lat) {
//       panTo({
//         lat: curMarker?.lat,
//         lng: curMarker?.lng,
//       });
//     }
//   }, [curMarker?.lat]);

//   return (
//     <button
//       className={classes.locate}
//       onClick={() => {
//         handleGetLocation();
//         // panTo({
//         //   lat: position?.coords.latitude,
//         //   lng: position?.coords.longitude,
//         // });
//       }}
//     >
//       {/* <img
//         src="https://www.freeiconspng.com/thumbs/compass-icon/compass-icon-27.png"
//         alt="compass"
//       /> */}
//       <Box className={classes.btnLocation}>
//         <Box className={classes.myLocation}></Box>
//       </Box>
//     </button>
//   );
// }

export default Locate;
