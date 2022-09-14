import { Box, Button, Input, Typography } from "@material-ui/core";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

import useStyles from "./styles.js";

const MENU_ICON_TOP = [
  {
    id: 0,
    img: "https://maps.gstatic.com/consumer/images/icons/1x/ic_directions_grey800_24px.png",
    imgClick:
      "https://maps.gstatic.com/consumer/images/icons/1x/ic_directions_filled_blue900_24px.png",
    travelModel: "DRIVING",
  },
  {
    id: 1,
    img: "https://maps.gstatic.com/consumer/images/icons/1x/directions_car_grey800_24dp.png",
    imgClick:
      "https://maps.gstatic.com/consumer/images/icons/1x/directions_car_filled_blue900_24dp.png",
    travelModel: "DRIVING",
  },
  {
    id: 2,
    img: "https://maps.gstatic.com/consumer/images/icons/1x/directions_transit_grey800_24dp.png",
    imgClick:
      "https://maps.gstatic.com/consumer/images/icons/1x/directions_transit_filled_blue900_24dp.png",
    travelModel: "TRANSIT",
  },
  {
    id: 3,
    img: "https://maps.gstatic.com/consumer/images/icons/1x/directions_walk_grey800_24dp.png",
    imgClick:
      "https://maps.gstatic.com/consumer/images/icons/1x/directions_walk_blue900_24dp.png",
    travelModel: "WALKING",
  },
];
function Directions({
  img,
  address,
  phone,
  lng,
  lat,
  isOpen,
  isClose,
  toUrl,
  name,
  ward,
  district,
  city,
  dragStart,
  listRoutes,
  distance,
  duration,
  directionsResponse,
  autocomplete,
  autocompleteDes,
  setDirectionsResponse,
  setListRoutes,
  setDistance,
  setDuration,
  setAutocomplete,
  setAutocompleteDes,
}) {
  const classes = useStyles();
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeIdxRoute, setActiveIdxRoute] = useState(0);
  const [travelModel, setTravelModel] = useState("DRIVING");
  const [changeOrigin, setchangeOrigin] = useState({
    origin: "",
    destiantion: "",
  });

  const [fromTo, setFromTo] = useState({
    origin: "",
    destiantion: "",
  });

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  const onLoad = (autocompleteVal) => {
    setAutocomplete(autocompleteVal);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      setFromTo({
        ...fromTo,
        origin: autocomplete?.getPlace(),
      });
    } else {
      console.log(" Autocomplete is not loaded yet!");
    }
  };

  const onLoadDes = (autocompleteVal) => {
    setAutocompleteDes(autocompleteVal);
  };

  const onPlaceChangedDes = () => {
    if (autocompleteDes !== null) {
      setFromTo({
        ...fromTo,
        destiantion: autocompleteDes?.getPlace(),
      });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const calculateRoute = async () => {
    if (fromTo?.origin === "" || fromTo?.destiantion === "") {
      return;
    }

    const directionsService =
      new google.maps.DirectionsService(); /*global google*/
    const results = await directionsService.route({
      origin: `${fromTo?.origin.geometry.location.lat()}, ${fromTo?.origin.geometry.location.lng()}`,
      destination: `${fromTo?.destiantion.geometry.location.lat()}, ${fromTo?.destiantion.geometry.location.lng()}`,
      travelMode: google.maps.TravelMode[travelModel],
      provideRouteAlternatives: true,
      // travelMode: google.maps.TravelMode.RECOMMENDED,
    });

    setListRoutes(results.routes);

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  };

  const handleClickTravel = (value) => {
    setActiveIdx(value?.id);

    switch (value?.id) {
      case 0:
        setTravelModel("DRIVING");
        break;
      case 1:
        setTravelModel("DRIVING");
        break;
      case 2:
        setTravelModel("TRANSIT");
        break;
      case 3:
        setTravelModel("WALKING");
        break;
      default:
        break;
    }
  };

  const renderImgRoutes = () => {
    switch (travelModel) {
      case "DRIVING":
        return "https://maps.gstatic.com/consumer/images/icons/1x/directions_car_grey800_24dp.png";
      case "WALKING":
        return "https://maps.gstatic.com/consumer/images/icons/1x/directions_walk_grey800_24dp.png";
      case "TRANSIT":
        return "https://maps.gstatic.com/consumer/images/icons/1x/directions_transit_grey800_24dp.png";
      default:
        break;
    }
  };

  const handleClickRoute = (value, idx) => {
    setActiveIdxRoute(idx);
    let arrRoutes = [];
    arrRoutes.push(value);

    setDirectionsResponse({
      ...directionsResponse,
      routes: arrRoutes,
    });
  };

  useEffect(() => {
    calculateRoute();
  }, [travelModel]);

  return (
    <>
      <Box className={classes.placeContainer}>
        <Box className={classes.topService}>
          <Box className={classes.left}>
            {MENU_ICON_TOP.map((x, idx) => (
              <Button
                className={`${classes.icon} ${
                  idx === activeIdx ? "active" : ""
                }`}
                key={idx}
                onClick={() => handleClickTravel(x)}
              >
                <img src={activeIdx === idx ? x?.imgClick : x?.img} alt="" />
              </Button>
            ))}
          </Box>

          <Box className={classes.right}>
            <Button className={classes.icon} onClick={isClose}>
              <img
                src="https://maps.gstatic.com/consumer/images/icons/1x/close_grey800_24dp.png"
                alt=""
              />
            </Button>
          </Box>
        </Box>

        <Box className={classes.inputs}>
          <Box className={classes.input}>
            <img src="https://maps.gstatic.com/consumer/images/icons/1x/start_location_grey800_18dp.png" />
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <Input
                className={classes.inputAdd}
                type="text"
                placeholder="Origin"
                inputRef={originRef}
              />
            </Autocomplete>
          </Box>
          <Box className={classes.input}>
            <img src="https://maps.gstatic.com/consumer/images/icons/1x/place_outline_red600_18dp.png" />
            <Autocomplete onLoad={onLoadDes} onPlaceChanged={onPlaceChangedDes}>
              <Input
                className={classes.inputAdd}
                type="text"
                placeholder="Destination"
                inputRef={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <Button className={classes.revertLocation} onClick={calculateRoute}>
            <img
              src="https://maps.gstatic.com/consumer/images/icons/1x/swap_vert_grey800_24dp.png"
              alt=""
            />
          </Button>
        </Box>

        <Box className={classes.content}>
          {listRoutes &&
            listRoutes?.map((x, idx) => {
              return (
                <Box
                  className={`${classes.vehicle} ${
                    activeIdxRoute === idx ? "active" : ""
                  }`}
                  key={idx}
                  onClick={() => handleClickRoute(x, idx)}
                >
                  <Box className="left">
                    <img src={renderImgRoutes()} alt="" />
                  </Box>
                  <Box className="mid">
                    <Typography variant="body1">{x?.summary}</Typography>
                  </Box>
                  <Box className="right">
                    <Typography variant="body1">
                      {x?.legs[0].duration?.text}
                    </Typography>
                    <Typography variant="body1">
                      {x?.legs[0].distance?.text}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
}

export default Directions;
