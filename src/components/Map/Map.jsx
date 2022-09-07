import { Box } from "@material-ui/core";
import "@reach/combobox/styles.css";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import Locate from "../Locate";
import PlaceDetail from "../PlaceDetail";
import PlacesAutocomplete from "../Places";

import useStyles from "./styles.js";

function Map() {
  const [curMarker, serCurMarker] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

  const onMapClick = React.useCallback((e) => {
    setArrayList((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(20);
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB5-tCnXi58TX6zOjQP8NpcNNewPOFCsh8",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  console.log({ curMarker });
  return (
    <>
      <Box className="seleted-marker">
        {selected ? (
          <PlaceDetail
            isOpen={isOpen}
            isClose={closePlace}
            address={selected?.address}
            lat={selected?.lat}
            lng={selected?.lng}
          />
        ) : null}
      </Box>

      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <Box className={classes.placesContainer}>
          <Locate panTo={panTo} serCurMarker={serCurMarker} />
          <PlacesAutocomplete panTo={panTo} />
        </Box>

        {arrList.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
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
          <div className={classes.currentMark}>
            <Marker
              key={`${curMarker.lat}-${curMarker.lng}`}
              position={{ lat: curMarker.lat, lng: curMarker.lng }}
              onClick={() => {
                // setSelected(marker);
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
            />
          </div>
        ) : null}
      </GoogleMap>
    </>
  );
}

export default Map;
