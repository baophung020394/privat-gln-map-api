import { Box, Button } from "@material-ui/core";
import "@reach/combobox/styles.css";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import Locate from "../Locate";
import PlaceDetail from "../PlaceDetail";
import PlacesAutocomplete from "../Places";
import useStyles from "./styles.js";
import axios from "axios";

function Map() {
  const [curMarker, setCurMarker] = useState();
  const [selected, setSelected] = useState(null);
  const [isMarkerSave, setIsMarkerSaved] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [isOpenPlace, setIsOpenPlace] = useState(null);
  const [isOpenInfo, setIsOpenInfo] = useState(null);
  const [isOpenInfoDrag, setIsOpenInfoDrag] = useState(null);
  const [isSaved, setIsSaved] = useState(null);
  const [isShow, setIsShow] = useState(null);
  const [centerChanged, setCenterChanged] = useState(null);

  const [storeMarkerSaved, setStoreMarkerSaved] = useState(
    JSON.parse(localStorage.getItem("listItemSaved")) || []
  );

  const [showMapSaved, setShowMapSaved] = useState(
    JSON.parse(localStorage.getItem("showMapSaved"))
  );

  const {
    listMarkerInput,
    setListMarkerInput,
    listMarkerSaved,
    setListMarkerSaved,
  } = useContext(AppContext);

  const classes = useStyles();

  const openPlace = () => {
    setIsOpen(true);
  };

  const closePlace = () => {
    setIsOpen(false);
  };

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

    const stringAddress = res?.data.results[0].formatted_address.split(",");

    setListMarkerInput((current) => [
      ...current,
      {
        address: res?.data.results[0].formatted_address,
        name: stringAddress[0],
        ward: stringAddress[1],
        district: stringAddress[2],
        city: stringAddress[3],
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        toUrl: `https://www.google.com/maps/?q=${e.latLng.lat()},${e.latLng.lng()}`,
        time: new Date(),
        status: "new",
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
    libraries: ["places"],
  });

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
    // setListMarkerInput([]);
    // setSelected(null);
  };

  const handleDragEnd = async () => {
    setDragStart(false);
    setIsOpenPlace(true);
    setIsOpenInfoDrag(true);
    setIsSaved(false);

    mapRef.current.panTo({
      lat: mapRef?.current?.center?.lat(),
      lng: mapRef?.current?.center?.lng(),
    });

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}&key=${
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }`
    );

    // Set marker current for drag end
    const stringAddress = res?.data.results[0].formatted_address.split(",");

    setCurMarker({
      address: res?.data.results[0].formatted_address,
      name: stringAddress[0],
      ward: stringAddress[1],
      district: stringAddress[2],
      city: stringAddress[3],
      lat: mapRef?.current?.center?.lat(),
      lng: mapRef?.current?.center?.lng(),
      toUrl: `https://www.google.com/maps/?q=${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`,
      time: new Date(),
      status: "new",
    });

    // Set marker list for drag end
    // res?.data?.results.slice(1, 5).forEach((x) => {
    //   const stringAddress2 = x?.formatted_address.split(",");
    setListMarkerInput((current) => [
      ...current,
      {
        address: res?.data.results[0].formatted_address,
        name: stringAddress[0],
        ward: stringAddress[1],
        district: stringAddress[2],
        city: stringAddress[3],
        lat: mapRef?.current?.center?.lat(),
        lng: mapRef?.current?.center?.lng(),
        toUrl: `https://www.google.com/maps/?q=${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`,
        time: new Date(),
        status: "new",
      },
    ]);
    // });

    setCenterChanged({
      lat: mapRef?.current?.center?.lat(),
      lng: mapRef?.current?.center?.lng(),
    });

    console.log({ res });

    // mapRef.current.panTo({
    //   lat: res?.data.results[0].geometry.location.lat,
    //   lng: res?.data.results[0].geometry.location.lng,
    // });
    // mapRef.current.setZoom(20);
  };

  const handleZoomChanged = () => {
    if (centerChanged) {
      mapRef.current.panTo({ lat: centerChanged.lat, lng: centerChanged.lng });
    }
  };

  const handleSaveMarker = (selectMar) => {
    setSelected({ ...selectMar, status: "old" });
    // setIsOpenInfo(true);
    setListMarkerSaved((current) => [
      ...current,
      {
        address: selectMar?.address,
        name: selectMar?.name,
        ward: selectMar?.ward,
        district: selectMar?.district,
        city: selectMar?.city,
        lat: selectMar?.lat,
        lng: selectMar?.lng,
        time: new Date(),
        status: "old",
      },
    ]);
  };

  const handleSaveMarkerCur = (curMar) => {
    setListMarkerSaved((current) => [
      ...current,
      {
        address: curMar?.address,
        name: curMar?.name,
        ward: curMar?.ward,
        district: curMar?.district,
        city: curMar?.city,
        lat: curMar?.lat,
        lng: curMar?.lng,
        time: new Date(),
        status: "old",
      },
    ]);
  };

  const handleShowMarkSaved = () => {
    setIsShow((show) => !show);
    if (listMarkerInput?.length > 0) {
      setListMarkerInput(null);
    }
  };

  console.log({ listMarkerSaved });
  console.log({ storeMarkerSaved });
  // console.log({ isSaved });
  console.log({ isShow });
  console.log({ showMapSaved });
  console.log({ selected });
  console.log({ isMarkerSave });

  useEffect(() => {
    if (isSaved && storeMarkerSaved?.length >= 0) {
      localStorage.setItem("listItemSaved", JSON.stringify(listMarkerSaved));
      setStoreMarkerSaved(JSON.parse(localStorage.getItem("listItemSaved")));
    }
  }, [isSaved]);

  useEffect(() => {
    // setShowMapSaved(JSON.parse(localStorage.getItem("showMapSaved")));
    if (isShow) {
      localStorage.getItem("showMapSaved");
      // localStorage.setItem("showMapSaved", `${JSON.stringify(true)}`);
      setShowMapSaved(JSON.parse(localStorage.getItem("showMapSaved")));
    } else {
      localStorage.getItem("showMapSaved");
      // localStorage.setItem("showMapSaved", `${JSON.stringify(false)}`);
      setShowMapSaved(JSON.parse(localStorage.getItem("showMapSaved")));
    }
  }, [isShow]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Box
        className={classes.seletedMarker}
        style={{
          marginLeft:
            isOpenPlace || (isOpenPlace && curMarker) ? "0" : "-390px",
        }}
      >
        {selected ? (
          <PlaceDetail
            isOpen={isOpen}
            isClose={closePlace}
            address={selected?.address}
            name={selected?.name}
            ward={selected?.ward}
            district={selected?.district}
            city={selected?.city}
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
            name={curMarker?.name}
            ward={curMarker?.ward}
            district={curMarker?.district}
            city={curMarker?.city}
            lat={curMarker?.lat}
            lng={curMarker?.lng}
            toUrl={curMarker?.toUrl}
          />
        ) : null}
      </Box>

      <GoogleMap
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        zoom={20}
        center={center}
        mapContainerClassName="map-container"
        onClick={onMapClick}
        onLoad={onMapLoad}
        // onCenterChanged={handleCenterChange}
        onZoomChanged={handleZoomChanged}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box className={classes.topHeader}>
          <Box className={classes.placesContainer}>
            <Locate panTo={panTo} setCurMarker={setCurMarker} />
            <PlacesAutocomplete
              panTo={panTo}
              selected={selected}
              curMarker={curMarker}
              setIsOpenPlace={setIsOpenPlace}
              setCurMarker={setCurMarker}
              setListMarkerSaved={setListMarkerSaved}
            />
          </Box>
          <Box className={classes.optionsChoose}>
            {showMapSaved ? (
              <Button
                className={classes.btnOption}
                onClick={() => {
                  handleShowMarkSaved();
                  localStorage.setItem(
                    "showMapSaved",
                    `${JSON.stringify(false)}`
                  );
                }}
              >
                Show map saved
              </Button>
            ) : (
              <Button
                className={classes.btnOption}
                onClick={() => {
                  handleShowMarkSaved();
                  localStorage.setItem(
                    "showMapSaved",
                    `${JSON.stringify(true)}`
                  );
                }}
              >
                Show map saved
              </Button>
            )}
          </Box>
        </Box>

        {listMarkerInput &&
          listMarkerInput.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
                setIsOpenPlace(true);
                setIsOpenInfo(true);
                setIsSaved(false);
                setCurMarker(null);
              }}
              icon={{
                url: `https://cdn-icons-png.flaticon.com/512/235/235353.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}

        {isOpenInfo ? (
          <InfoWindow
            style={{ top: "-15px" }}
            zIndex={1}
            position={{ lat: selected?.lat, lng: selected?.lng }}
            onCloseClick={() => {
              setIsOpenInfo(false);
            }}
          >
            <div className="wrapper-info">
              <h3>{selected?.name} </h3>
              <p>Ward: {selected?.ward}</p>
              <p>Disctrict: {selected?.district}</p>
              <p>City: {selected?.city}</p>
              {/* <p>Spotted {formatRelative(selected.time, new Date())}</p> */}
              <a href={selected?.toUrl} target="_blank">
                View on Google Maps
              </a>
              <Button
                className={classes.save}
                onClick={() => {
                  handleSaveMarker(selected);
                  setIsSaved(true);
                }}
              >
                Save - {selected?.status === "old" ? "old" : "new"}
              </Button>
            </div>
          </InfoWindow>
        ) : null}

        {curMarker ? (
          <div
            className={`${classes.currentMark} ${dragStart ? "shadow" : ""}`}
            onClick={() => {
              setCurMarker({ ...curMarker, status: "old" });
              setIsOpenPlace(true);
              setIsOpenInfoDrag(true);
              setSelected(null);
            }}
          >
            {isOpenInfoDrag ? (
              <InfoWindow
                zIndex={1}
                position={{ lat: curMarker?.lat, lng: curMarker?.lng }}
                onCloseClick={() => {
                  setIsOpenInfoDrag(false);
                }}
              >
                <div className="wrapper-info">
                  <h3>{curMarker?.name} </h3>
                  <p>Ward: {curMarker?.ward}</p>
                  <p>Disctrict: {curMarker?.district}</p>
                  <p>City: {curMarker?.city}</p>
                  {/* <p>Spotted {formatRelative(curMarker.time, new Date())}</p> */}
                  <a href={curMarker?.toUrl} target="_blank">
                    View on Google Maps
                  </a>
                  <Button
                    className={classes.save}
                    onClick={() => {
                      handleSaveMarkerCur(curMarker);
                      setIsSaved(true);
                    }}
                  >
                    Save - {curMarker?.status === "old" ? "old" : "new"}
                  </Button>
                </div>
              </InfoWindow>
            ) : null}
          </div>
        ) : null}

        {storeMarkerSaved &&
          showMapSaved &&
          storeMarkerSaved?.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
                setIsOpenPlace(true);
              }}
              icon={{
                url: `https://cdn-icons-png.flaticon.com/512/235/235353.png`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
      </GoogleMap>
    </>
  );
}

export default Map;
