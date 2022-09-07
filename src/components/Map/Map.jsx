import { Box } from "@material-ui/core";
import "@reach/combobox/styles.css";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import Locate from "../Locate";
import PlaceDetail from "../PlaceDetail";
import PlacesAutocomplete from "../Places";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import useStyles from "./styles.js";
import axios from "axios";

function Map() {
  const [curMarker, serCurMarker] = useState();
  const [selected, setSelected] = useState(null);
  const [markerClick, setMarkerClick] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [isOpenPlace, setIsOpenPlace] = useState(null);
  const [centerChanged, setCenterChanged] = useState(null);

  const classes = useStyles();

  const openPlace = () => {
    setIsOpen(true);
  };

  const closePlace = () => {
    setIsOpen(false);
  };
  const { arrList, setArrayList } = useContext(AppContext);

  const center = useMemo(
    () => ({
      lat: 10.767300291295264,
      lng: 106.70365911041766,
    }),
    []
  );

  const onMapClick = React.useCallback(async (e) => {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&key=${
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }`
    );

    console.log({ res });

    setArrayList((current) => [
      ...current,
      {
        address: res?.data.results[0].formatted_address,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        toUrl: `https://www.google.com/maps/?q=${e.latLng.lat()},${e.latLng.lng()}`,
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    console.log({ mapRef });
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(20);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleCenterChange = () => {
    console.log(mapRef?.current?.center?.lat());
    window.setTimeout(() => {
      mapRef.current.panTo({
        lat: mapRef?.current?.center?.lat(),
        lng: mapRef?.current?.center?.lng(),
      });
    }, 3000);
  };

  const handleDragStart = () => {
    setDragStart(true);
    setIsOpenPlace(false);
    setArrayList([]);
    setSelected(null);
  };

  const handleDragEnd = async () => {
    setDragStart(false);
    setIsOpenPlace(true);

    mapRef.current.panTo({
      lat: mapRef?.current?.center?.lat(),
      lng: mapRef?.current?.center?.lng(),
    });

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}&key=${
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }`
    );

    res?.data?.results.slice(0, 5).forEach((x) => {
      setArrayList((current) => [
        ...current,
        {
          address: x?.formatted_address,
          lat: x?.geometry.location.lat,
          lng: x?.geometry.location.lng,
          time: new Date(),
        },
      ]);
    });

    serCurMarker({
      address: res?.data.results[0].formatted_address,
      lat: mapRef?.current?.center?.lat(),
      lng: mapRef?.current?.center?.lng(),
      toUrl: `https://www.google.com/maps/?q=${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`,
      time: new Date(),
    });

    console.log({ res });
  };

  const handleZoomChanged = () => {
    // mapRef.current.panTo({
    //   lat: curMarker.lat(),
    //   lng: curMarker.lng(),
    // });
  };

  return (
    <>
      <Box
        className={classes.seletedMarker}
        style={{
          marginLeft: selected || (isOpenPlace && curMarker) ? "0" : "-370px",
        }}
      >
        {selected ? (
          <PlaceDetail
            isOpen={isOpen}
            isClose={closePlace}
            address={selected?.address}
            lat={selected?.lat}
            lng={selected?.lng}
            toUrl={selected?.toUrl}
          />
        ) : null}

        {curMarker ? (
          <PlaceDetail
            isOpen={isOpen}
            isClose={closePlace}
            address={curMarker?.address}
            lat={curMarker?.lat}
            lng={curMarker?.lng}
            toUrl={curMarker?.toUrl}
          />
        ) : null}
      </Box>

      <GoogleMap
        zoom={15}
        center={center}
        onZoomChanged={handleZoomChanged}
        mapContainerClassName="map-container"
        onClick={onMapClick}
        onLoad={onMapLoad}
        // onCenterChanged={handleCenterChange}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box className={classes.placesContainer}>
          <Locate panTo={panTo} serCurMarker={serCurMarker} />
          <PlacesAutocomplete panTo={panTo} serCurMarker={serCurMarker} />
        </Box>

        {arrList.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
              serCurMarker(null);
              openPlace();
            }}
            icon={{
              url: `https://cdn-icons-png.flaticon.com/512/235/235353.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            animation={
              selected?.lng === marker?.lng
                ? window.google.maps.Animation.BOUNCE
                : window.google.maps.Animation.DROP
            }
            draggable={true}
          />
        ))}

        {selected ? (
          <InfoWindow
            style={{ top: "-15px" }}
            zIndex={1}
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                Alert
              </h2>
              <p>Address: {selected?.address} </p>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}

        {curMarker ? (
          <div
            className={`${classes.currentMark} ${dragStart ? "shadow" : ""}`}
            onClick={() => {
              serCurMarker(curMarker);
              setIsOpenPlace(true);
            }}
          >
            {isOpenPlace ? (
              <InfoWindow
                style={{ top: "-15px" }}
                zIndex={1}
                position={{ lat: curMarker?.lat, lng: curMarker?.lng }}
                onCloseClick={() => {
                  setIsOpenPlace(false);
                }}
              >
                <div>
                  <h2>
                    <span role="img" aria-label="bear">
                      🐻
                    </span>{" "}
                    Alert
                  </h2>
                  <p>Address: <a href={curMarker?.toUrl} target="_blank">{curMarker?.address}</a> </p>
                  <p>Spotted {formatRelative(curMarker?.time, new Date())}</p>
                </div>
              </InfoWindow>
            ) : null}

            {/* <Marker
              key={`${curMarker.lat}-${curMarker.lng}`}
              position={{ lat: curMarker.lat, lng: curMarker.lng }}
              onClick={() => {
                setSelected(curMarker);
                openPlace();
              }}
              icon={{
                url: `https://cdn-icons-png.flaticon.com/512/235/235353.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              animation={
                selected?.lng === curMarker?.lng
                  ? window.google.maps.Animation.BOUNCE
                  : window.google.maps.Animation.DROP
              }
              draggable={true}
            /> */}
          </div>
        ) : null}
      </GoogleMap>
    </>
  );
}

export default Map;
