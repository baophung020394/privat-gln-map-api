import { Box, Button } from "@material-ui/core";
import "@reach/combobox/styles.css";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import Locate from "../Locate";
import PlaceDetail from "../PlaceDetail";
import PlacesAutocomplete from "../Places";
import useStyles from "./styles.js";
import axios from "axios";
import Directions from "../Directions";
import NearByMe from "./NearByMe";
import ListMarkerInput from "./ListMarkerInput";
import InforWindowCustom from "./InforWindowCustom";
import CurrentMarker from "./CurrentMarker";

import Slider from "react-slick/lib/slider";

const imageMaker = {
  market:
    "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
  marker:
    "https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png",
  test: "https://image-us.24h.com.vn/upload/1-2022/images/2022-03-16/baukrysie_275278910_3174792849424333_1380029197326773703_n-1647427653-670-width1440height1800.jpg",
};

const CATEGORIES = [
  {
    id: 0,
    name: "Street",
    value: "street_food",
    urlImg:
      "https://cdn0.iconfinder.com/data/icons/food-delivery-outline-stay-home/512/Location-512.png",
  },
  {
    id: 1,
    name: "Restaurant",
    value: "restaurant",
    urlImg:
      "https://cdn0.iconfinder.com/data/icons/travel-vacation/290/travel-transport-hotel-vacation-holidays-tourist-tourism-travelling-traveling_149-512.png",
  },
  {
    id: 2,
    name: "Hotel",
    value: "hotel",
    urlImg:
      "https://icon-library.com/images/hotel-icon-map/hotel-icon-map-15.jpg",
  },
  {
    id: 3,
    name: "Hospital",
    value: "hospital",
    urlImg:
      "https://www.vhv.rs/dpng/d/406-4069627_hospital-place-pin-map-location-hospital-logo-png.png",
  },
  {
    id: 4,
    name: "Building",
    value: "building",
    urlImg:
      "https://cdn3.vectorstock.com/i/1000x1000/05/07/building-map-pointer-icon-marker-gps-location-vector-15450507.jpg",
  },
  {
    id: 5,
    name: "School",
    value: "school",
    urlImg:
      "https://w7.pngwing.com/pngs/475/104/png-transparent-computer-icons-google-maps-school-student-map-monochrome-university-black.png",
  },
  {
    id: 6,
    name: "Office",
    value: "office",
    urlImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTOaskyG6Bv5CcboqdL9BGWH6NhHGYyhC3URFllBFnooDPvwl7pqBUmkUtw_Ac09fkSCs&usqp=CAU",
  },
  {
    id: 7,
    name: "ATM",
    value: "atm",
    urlImg:
      "https://cdn4.iconfinder.com/data/icons/personal-business-finance-gray-series-set-2/64/gray-72-512.png",
  },
  {
    id: 8,
    name: "Home",
    value: "home",
    urlImg: "https://static.thenounproject.com/png/106445-200.png",
  },
  {
    id: 9,
    name: "All",
    value: "all",
    urlImg: "https://cdn-icons-png.flaticon.com/512/5110/5110770.png",
  },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "#fff",
        borderRadius: "100%",
        width: 20,
        height: 20,
        justifyContent: "center !important",
        alignContent: "center !important",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "#fff",
        borderRadius: "100%",
        width: 20,
        height: 20,
        justifyContent: "center !important",
        alignContent: "center !important",
      }}
      onClick={onClick}
    />
  );
}

function Map() {
  const [isCloseNear, setIsCloseNear] = useState(false);
  const [curMarker, setCurMarker] = useState();
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [isOpenRatingDetail, setIsOpenRatingDetail] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [isOpenPlace, setIsOpenPlace] = useState(null);
  const [isOpenInfo, setIsOpenInfo] = useState(null);
  const [isOpenInfoDrag, setIsOpenInfoDrag] = useState(null);
  const [isSaved, setIsSaved] = useState(null);
  const [isShow, setIsShow] = useState(null);
  const [openDirection, setOpenDirection] = useState(null);
  const [centerChanged, setCenterChanged] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [listRoutes, setListRoutes] = useState(null);
  const [autocomplete, setAutocomplete] = useState("");
  const [autocompleteDes, setAutocompleteDes] = useState("");
  const [categ, setCateg] = useState(localStorage.getItem("categ"));
  const [nearByMe, setNearByMe] = useState([]);
  const [selectNearByMe, setSelectNearByMe] = useState(null);
  const [storeMarkerSaved, setStoreMarkerSaved] = useState(
    JSON.parse(localStorage.getItem("listItemSaved")) || []
  );

  const [showMapSaved, setShowMapSaved] = useState(
    JSON.parse(localStorage.getItem("showMapSaved"))
  );

  const refSlide = useRef({});

  let libraries = ["places"];

  const next = () => {
    console.log("phai");
    refSlide.current.slickNext();
  };

  const previous = () => {
    console.log("trai");
    refSlide.current.slickPrev();
  };

  const settings = {
    className: "section-outstanding__slider",
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    // rtl: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // responsive: [
    //   {
    //     breakpoint: 1198,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       rows: 2,
    //     },
    //   },
    //   {
    //     breakpoint: 576,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       rows: 1,
    //     },
    //   },
    // ],
  };

  const {
    listMarkerInput,
    setListMarkerInput,
    listMarkerSaved,
    setListMarkerSaved,
  } = useContext(AppContext);

  const classes = useStyles();

  const selectRef = useRef(null);

  const openPlace = () => {
    setIsOpen(true);
  };

  const closePlace = () => {
    setIsOpen(false);
  };

  const openDirections = () => {
    setOpenDirection(true);
  };
  const closeDirection = () => {
    setOpenDirection(false);
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

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(
    ({ lat, lng }) => {
      mapRef.current.panTo({ lat, lng });
      if (
        directionsResponse?.routes.length < 0 ||
        directionsResponse === null
      ) {
        mapRef.current.setZoom(20);
      } else {
        mapRef.current.setZoom(17);
      }
    },
    [directionsResponse]
  );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
    language:
      navigator && navigator.languages ? navigator.language.slice(0, 2) : "vi",
    // language: navigator && navigator.languages ? "vi" : "vi",
  });

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

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}&key=${
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY
      }`
    );

    const request = {
      placeId: res?.data.results[0].place_id,
    };

    const service = new google.maps.places.PlacesService(
      mapRef.current
    ); /*global google*/

    service.getDetails(request, function (place, status) {
      if (
        status ===
          google.maps.places.PlacesServiceStatus.OK /*global google*/ &&
        place
        // &&
        // place.geometry &&
        // place.geometry.location
      ) {
        console.log({ place });
        let listPhoto = [];
        if (place?.photos) {
          place?.photos.forEach((x) => listPhoto.push(x.getUrl()));
        }
        // Set marker current for drag end
        // console.log(place);
        const stringAddress = res?.data.results[0].formatted_address.split(",");

        setCurMarker({
          address: res?.data.results[0].formatted_address,
          name: place?.name,
          ward: stringAddress[1],
          district: stringAddress[2],
          city: stringAddress[3],
          lat: mapRef?.current?.center?.lat(),
          lng: mapRef?.current?.center?.lng(),
          plusCode: res?.data.plus_code.compound_code,
          placeId: res?.data.results[0].place_id,
          photos: listPhoto,
          reviews: place?.reviews,
          openHours: {
            isOpen: place?.opening_hours?.isOpen() ? "Open" : "Closed",
            weekdayText: place?.opening_hours?.weekday_text,
            periods: place?.opening_hours?.periods,
          },
          phoneNumber: place?.formatted_phone_number
            ? place?.formatted_phone_number
            : "No phone number",
          rating: place?.rating,
          userRatingsTotal: place?.user_ratings_total,
          website: place?.website ? place?.website : "No website",
          icons: {
            icon: place?.icon,
            url: place?.icon_mask_base_uri,
            backgroundColor: place?.icon_background_color,
          },
          category: "",
          nameCategory: "...",
          toUrl: `https://www.google.com/maps/?q=${mapRef?.current?.center?.lat()},${mapRef?.current?.center?.lng()}`,
          time: new Date(),
          status: "new",
          imgSave: imageMaker?.marker,
        });
      }
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
    console.log({ selectMar });
    setListMarkerInput(
      listMarkerInput?.map((x) =>
        x?.lng === selectMar?.lng ? { ...x, status: "old" } : x
      )
    );

    setSelected({
      ...selected,
      status: "old",
    });

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
        category: selectMar?.category ? selectMar?.category : "street_food",
        time: new Date(),
        status: "old",
        photos: selectMar?.photos,
        reviews: selectMar?.reviews,
        plusCode: selectMar.plusCode,
        placeId: selectMar.placeId,
        rating: selectMar?.rating,
        website: selectMar?.website ? selectMar?.website : "No website",
        userRatingsTotal: selectMar?.userRatingsTotal,
        openHours: {
          isOpen: selectMar?.openHours.isOpen,
          weekdayText: selectMar?.openHours.weekdayText,
          periods: selectMar?.openHours.periods,
        },
        icons: {
          icon: selectMar?.icons.icon,
          url: selectMar?.icons.url,
          backgroundColor: selectMar?.icons.backgroundColor,
        },
        phoneNumber: selectMar?.phoneNumber,
        nameCategory: selectMar?.index
          ? CATEGORIES[selectMar?.index]?.name
          : CATEGORIES[0]?.name,
        imgSave: selectMar?.index
          ? CATEGORIES[selectMar?.index]?.urlImg
          : CATEGORIES[0]?.urlImg,
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
        plusCode: curMar.plusCode,
        placeId: curMar.placeId,
        photos: curMar?.photos,
        reviews: curMar?.reviews,
        rating: curMar?.rating,
        website: curMar?.website ? curMar?.website : "No website",
        userRatingsTotal: curMar?.userRatingsTotal,
        openHours: {
          isOpen: curMar?.openHours.isOpen,
          weekdayText: curMar?.openHours.weekdayText,
          periods: curMar?.openHours.periods,
        },
        icons: {
          icon: curMar?.icons.icon,
          url: curMar?.icons.url,
          backgroundColor: curMar?.icons.backgroundColor,
        },
        phoneNumber: curMar?.phoneNumber,
        category: curMar?.category ? curMar?.category : "hotel",
        nameCategory: curMar?.index
          ? CATEGORIES[curMar?.index]?.name
          : CATEGORIES[0]?.name,
        imgSave: curMar?.index
          ? CATEGORIES[curMar?.index]?.urlImg
          : CATEGORIES[0]?.urlImg,
      },
    ]);
  };

  const nearMe = async (type) => {
    mapRef.current.setZoom(15);

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };
    setCurMarker(null);

    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        const res = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position?.coords.latitude},${position?.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );

        console.log({ res });
        const params = {
          lat: res?.data?.results[0]?.geometry.location.lat,
          lng: res?.data?.results[0]?.geometry.location.lng,
        };
        const request = {
          location: params,
          radius: "5000",
          type: [`${type}`],
        };

        const service = new google.maps.places.PlacesService(
          mapRef.current
        ); /*global google*/

        service.nearbySearch(request, function (place, status) {
          if (
            status ===
              google.maps.places.PlacesServiceStatus.OK /*global google*/ &&
            place
          ) {
            place?.forEach((x) => {
              setNearByMe((current) => [
                ...current,
                {
                  name: x?.name,
                  lat: x?.geometry?.location?.lat(),
                  lng: x?.geometry?.location?.lng(),
                  icons: {
                    icon: x?.icon,
                    url: x?.icon_mask_base_uri,
                    backgroundColor: x?.icon_background_color,
                  },
                  imgSave: CATEGORIES[0]?.urlImg,
                },
              ]);
            });
          }
        });

        mapRef.current.setZoom(15);
        mapRef.current.panTo({
          lat: position?.coords.latitude,
          lng: position?.coords.longitude,
        });
      },
      () => null,
      options
    );
  };
  /**
   * Show mark saved
   */
  const handleShowMarkSaved = () => {
    setIsShow((show) => !show);
  };

  useEffect(() => {
    if (categ === "" || !categ) {
      setCateg("hotel");
    }
  }, []);

  useEffect(() => {
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
        zoom={17}
        center={center}
        mapContainerClassName="map-container"
        onLoad={onMapLoad}
        onZoomChanged={handleZoomChanged}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {directionsResponse && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              draggable: true,
              suppressMarkers: false,
            }}
          />
        )}

        <Box className={classes.topHeader}>
          <Box className={classes.placesContainer}>
            <Locate
              curMarker={curMarker}
              panTo={panTo}
              setCurMarker={setCurMarker}
              setListMarkerInput={setListMarkerInput}
              setCenterChanged={setCenterChanged}
              ref={mapRef}
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
              ref={mapRef}
            />

            <Button
              className={classes.buttonDirection}
              onClick={openDirections}
            >
              <img src="https://maps.gstatic.com/tactile/omnibox/directions-2x-20150909.png" />
            </Button>
          </Box>

          <Box className={classes.optionsChoose}>
            {!isCloseNear ? (
              <>
                <Box className={classes.wrapBtnsNear}>
                  <Slider ref={refSlide} {...settings}>
                    <Button
                      className={classes.btnOption}
                      onClick={() => {
                        setIsCloseNear(true);
                        nearMe("atm");
                      }}
                    >
                      ATM
                    </Button>

                    <Button
                      className={classes.btnOption}
                      onClick={() => {
                        setIsCloseNear(true);
                        nearMe("bank");
                      }}
                    >
                      Bank
                    </Button>

                    <Button
                      className={classes.btnOption}
                      onClick={() => {
                        setIsCloseNear(true);
                        nearMe("restaurant");
                      }}
                    >
                      Restaurant
                    </Button>
                    <Button
                      className={classes.btnOption}
                      onClick={() => {
                        setIsCloseNear(true);
                        nearMe("hotel");
                      }}
                    >
                      Hotel
                    </Button>
                    <Button
                      className={classes.btnOption}
                      onClick={() => {
                        setIsCloseNear(true);
                        nearMe("cafe");
                      }}
                    >
                      Cafe
                    </Button>
                    <Button
                      className={classes.btnOption}
                      onClick={() => {
                        setIsCloseNear(true);
                        nearMe("hospital");
                      }}
                    >
                      Hospital
                    </Button>
                    <Button
                      className={classes.btnOption}
                      onClick={() => {
                        setIsCloseNear(true);
                        nearMe("gas_station");
                      }}
                    >
                      Gas station
                    </Button>
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
                  </Slider>
                </Box>
              </>
            ) : (
              <Button
                className={classes.btnOption}
                onClick={() => {
                  setIsCloseNear(false);
                  setNearByMe([]);
                }}
              >
                {nearByMe?.length > 0 ? (
                  "Close filter"
                ) : (
                  <div className="loaders">
                    <div className="loader">
                      <span className="loader__element"></span>
                      <span className="loader__element"></span>
                      <span className="loader__element"></span>
                    </div>
                  </div>
                )}
              </Button>
            )}
          </Box>
        </Box>

        {nearByMe?.length > 0 &&
          nearByMe?.map((x, index) => {
            return (
              <Marker
                key={`${x?.lat}-${index}`}
                position={{
                  lat: x?.lat,
                  lng: x?.lng,
                }}
                onClick={() => {
                  setSelectNearByMe(x);
                  // setIsOpenPlace(true);
                  // setIsOpenInfo(true);
                  // setIsOpenInfoDrag(false);
                  // setIsSaved(false);
                }}
                icon={{
                  url: x?.icons?.icon,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30),
                }}
              />
            );
          })}

        {selectNearByMe ? (
          <InfoWindow
            zIndex={2}
            position={{ lat: selectNearByMe?.lat, lng: selectNearByMe?.lng }}
            onCloseClick={() => {
              setSelectNearByMe(null);
            }}
          >
            <div className="wrapper-info">
              <h3>{selectNearByMe?.name} </h3>
            </div>
          </InfoWindow>
        ) : null}

        <ListMarkerInput
          listMarkerInput={listMarkerInput}
          setSelected={setSelected}
          setIsOpenPlace={setIsOpenPlace}
          setIsOpenInfo={setIsOpenInfo}
          setIsOpenInfoDrag={setIsOpenInfoDrag}
          setIsSaved={setIsSaved}
        />

        {isOpenInfo && selected?.status === "new" ? (
          <InforWindowCustom
            categ={categ}
            selected={selected}
            setSelected={setSelected}
            setIsOpenInfo={setIsOpenInfo}
            handleSaveMarker={handleSaveMarker}
            listCategory={CATEGORIES}
            setCateg={setCateg}
            ref={selectRef}
            setIsSaved={setIsSaved}
          />
        ) : null}

        {curMarker ? (
          <CurrentMarker
            handleSaveMarkerCur={handleSaveMarkerCur}
            setCurMarker={setCurMarker}
            setIsOpenInfoDrag={setIsOpenInfoDrag}
            setIsOpenPlace={setIsOpenPlace}
            dragStart={dragStart}
            curMarker={curMarker}
            imageMaker={imageMaker}
            isOpenInfoDrag={isOpenInfoDrag}
            categ={categ}
            selected={selected}
            setSelected={setSelected}
            setIsOpenInfo={setIsOpenInfo}
            handleSaveMarker={handleSaveMarker}
            listCategory={CATEGORIES}
            setCateg={setCateg}
            ref={selectRef}
            setIsSaved={setIsSaved}
          />
        ) : null}

        {storeMarkerSaved &&
          showMapSaved &&
          storeMarkerSaved
            ?.filter(
              (x) =>
                (x?.status === "old" && x?.category === categ) ||
                (x?.status === "old" && categ === "all")
            )
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
                  scaledSize: new window.google.maps.Size(35, 35),
                }}
              />
            ))}

        <Box
          className={classes.seletedMarker}
          style={{
            marginLeft: isOpenPlace ? "0" : "-425px",
            zIndex: isOpenGallery || isOpenRatingDetail ? 1 : 0,
          }}
        >
          {selected ? (
            <PlaceDetail
              isOpen={isOpen}
              isClose={closePlace}
              selected={selected}
              dragStart={dragStart}
              isOpenGallery={isOpenGallery}
              setIsOpenGallery={setIsOpenGallery}
              setIsOpenRatingDetail={setIsOpenRatingDetail}
              isOpenRatingDetail={isOpenRatingDetail}
            />
          ) : null}

          {curMarker ? (
            <PlaceDetail
              dragStart={dragStart}
              isOpen={isOpen}
              isClose={closePlace}
              selected={curMarker}
              isOpenGallery={isOpenGallery}
              setIsOpenGallery={setIsOpenGallery}
              setIsOpenRatingDetail={setIsOpenRatingDetail}
              isOpenRatingDetail={isOpenRatingDetail}
            />
          ) : null}
        </Box>

        <Box className={classes.listCategory}>
          {CATEGORIES.map((x, idx) => (
            <Button
              data-hover={x?.name}
              className={classes.btnCategory}
              key={idx}
              onClick={() => {
                setCateg(x?.value);
                localStorage.setItem("categ", x?.value);
              }}
            >
              <img src={x?.urlImg} alt="" />
            </Button>
          ))}
        </Box>

        <Box
          className={classes.directions}
          style={{
            marginLeft: openDirection ? "0" : "-425px",
          }}
        >
          <Directions
            isClose={closeDirection}
            setDirectionsResponse={setDirectionsResponse}
            listMarkerSaved={listMarkerSaved}
            distance={distance}
            duration={duration}
            listRoutes={listRoutes}
            autocomplete={autocomplete}
            autocompleteDes={autocompleteDes}
            directionsResponse={directionsResponse}
            setDistance={setDistance}
            setDuration={setDuration}
            setListRoutes={setListRoutes}
            setAutocomplete={setAutocomplete}
            setAutocompleteDes={setAutocompleteDes}
          />
        </Box>
      </GoogleMap>
    </>
  );
}

export default Map;
