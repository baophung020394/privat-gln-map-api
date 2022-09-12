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

const imageMaker = {
  market:
    "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
  marker:
    "https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png",
  test: "https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg",
};

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
  const [markerDrag, setMarkerDrag] = useState(null);
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

  /**
   * Click any where on map
   */
  const onMapClick = React.useCallback(async (e) => {
    if (e?.latLng.lat() && e?.latLng.lng()) {
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
          lat: e?.latLng.lat(),
          lng: e?.latLng.lng(),
          toUrl: `https://www.google.com/maps/?q=${e?.latLng.lat()},${e?.latLng.lng()}`,
          time: new Date(),
          status: "new",
          imgSabe:
            "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
        },
      ]);
    }
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
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // const handleCenterChange = () => {
  //   window.setTimeout(() => {
  //     mapRef.current.panTo({
  //       lat: mapRef?.current?.center?.lat(),
  //       lng: mapRef?.current?.center?.lng(),
  //     });
  //   }, 3000);
  // };

  /**
   * Start drag map
   */
  const handleDragStart = () => {
    setCurMarker({
      imgSave:
        "https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png",
    });
    setDragStart(true);
    setIsOpenInfoDrag(false);
    setSelected(null);
  };

  /**
   * End drag map
   */
  const handleDragEnd = async () => {
    setDragStart(false);
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
      imgSave:
        "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
    });

    setCenterChanged({
      lat: mapRef?.current?.center?.lat(),
      lng: mapRef?.current?.center?.lng(),
    });
  };

  /**
   * handle event zoom changed
   */
  const handleZoomChanged = async () => {
    if (centerChanged?.lat) {
      mapRef?.current.panTo({
        lat: centerChanged?.lat,
        lng: centerChanged?.lng,
      });
    }
  };

  /**
   * Save marker input, drag
   * @param {*} selectMar
   */
  const handleSaveMarker = (selectMar) => {
    // localStorage.setItem("showMapSaved", `${JSON.stringify(true)}`);

    setListMarkerInput(
      listMarkerInput?.map((x) =>
        x?.lng === selectMar?.lng ? { ...x, status: "old" } : x
      )
    );

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
        imgSave:
          "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
      },
    ]);
  };

  /**
   * Save marker current
   * @param {*} curMar
   */
  const handleSaveMarkerCur = (curMar) => {
    setCurMarker(null);

    setListMarkerSaved((current) => [
      ...current,
      {
        address: curMar?.address,
        name: curMar?.name,
        ward: curMar?.ward,
        district: curMar?.district,
        city: curMar?.city,
        lat: Number(curMar?.lat),
        lng: Number(curMar?.lng),
        time: new Date(),
        status: "old",
        imgSave:
          "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
      },
    ]);
  };

  /**
   * Show mark saved
   */
  const handleShowMarkSaved = () => {
    setIsShow((show) => !show);
  };

  useEffect(() => {
    console.log({ centerChanged });
    if (curMarker) {
      setCenterChanged({
        lat: curMarker?.lat,
        lng: curMarker?.lng,
      });
    }
  }, [curMarker?.lat]);

  useEffect(() => {
    if (!localStorage.getItem("showMapSaved")) {
      localStorage.setItem("showMapSaved", `${JSON.stringify(true)}`);
    }
  }, [localStorage.getItem("showMapSaved")]);

  useEffect(() => {
    if (isSaved && storeMarkerSaved?.length >= 0) {
      localStorage.setItem("listItemSaved", JSON.stringify(listMarkerSaved));
      setStoreMarkerSaved(JSON.parse(localStorage.getItem("listItemSaved")));
      setIsSaved(false);
    }
  }, [isSaved]);

  useEffect(() => {
    // setShowMapSaved(JSON.parse(localStorage.getItem("showMapSaved")));
    if (isShow) {
      localStorage.getItem("showMapSaved");
      setShowMapSaved(JSON.parse(localStorage.getItem("showMapSaved")));
    } else {
      localStorage.getItem("showMapSaved");
      setShowMapSaved(JSON.parse(localStorage.getItem("showMapSaved")));
    }
  }, [isShow]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
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
        onZoomChanged={handleZoomChanged}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box className={classes.topHeader}>
          <Box className={classes.placesContainer}>
            <Locate
              curMarker={curMarker}
              panTo={panTo}
              setCurMarker={setCurMarker}
              setListMarkerInput={setListMarkerInput}
              setCenterChanged={setCenterChanged}
            />
            <PlacesAutocomplete
              centerChanged={centerChanged}
              setCenterChanged={setCenterChanged}
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

            <Button
              className={classes.btnOption}
              onClick={() => {
                localStorage.removeItem("listItemSaved");
                setSelected(null);
                setCurMarker(null);
                setStoreMarkerSaved([]);
                setListMarkerInput([]);
                window.location.reload();
              }}
            >
              Clear map saved
            </Button>
          </Box>
        </Box>

        {listMarkerInput &&
          listMarkerInput
            .filter((x) => x?.status === "new")
            .map((marker, index) => (
              <Marker
                // draggable={true}
                key={`${marker.lat}-${index}`}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                  setIsOpenPlace(true);
                  setIsOpenInfo(true);
                  setIsOpenInfoDrag(false);
                  setIsSaved(false);
                }}
                icon={{
                  url: `https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png`,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ))}

        {isOpenInfo && selected?.status === "new" ? (
          <InfoWindow
            zIndex={2}
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

        {/*https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png*/}

        {curMarker ? (
          <div
            className={`curMarker ${classes.currentMark} ${
              dragStart ? "shadow" : ""
            }`}
            style={{
              backgroundImage: `url(${imageMaker?.marker})`,
            }}
            onClick={() => {
              setIsOpenPlace(true);
              setIsOpenInfo(false);
              setIsOpenInfoDrag(true);
              setSelected(null);
            }}
          >
            {!dragStart && isOpenInfoDrag && curMarker?.status === "new" ? (
              <InfoWindow
                zIndex={2}
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
                  <a href={curMarker?.toUrl} target="_blank">
                    View on Google Maps
                  </a>
                  <a href={curMarker?.toUrl} target="_blank">
                    {curMarker?.lat} - {curMarker?.lng}
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
          storeMarkerSaved
            ?.filter((x) => x?.status === "old")
            ?.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                  setIsOpenPlace(true);
                }}
                icon={{
                  url: `${marker?.imgSave}`,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            ))}

        <Box
          className={classes.seletedMarker}
          style={{
            // || (isOpenPlace && curMarker)
            marginLeft: isOpenPlace ? "0" : "-390px",
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
              dragStart={dragStart}
            />
          ) : null}

          {curMarker ? (
            <PlaceDetail
              dragStart={dragStart}
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
      </GoogleMap>
    </>
  );
}

export default Map;
