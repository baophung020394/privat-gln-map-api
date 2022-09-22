import { Button } from "@material-ui/core";
import { InfoWindow } from "@react-google-maps/api";
import React, { forwardRef } from "react";
import InforWindowCustom from "./InforWindowCustom";
import useStyles from "./styles.js";

const CurrentMarker = forwardRef(
  (
    {
      dragStart,
      curMarker,
      imageMaker,
      isOpenInfoDrag,
      selected,
      setSelected,
      setCateg,
      categ,
      listCategory,
      setIsOpenInfo,
      handleSaveMarker,
      setIsSaved,
      setIsOpenPlace,
      setIsOpenInfoDrag,
      setCurMarker,
      handleSaveMarkerCur,
    },
    ref
  ) => {
    const classes = useStyles();

    return (
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
              <h3>{curMarker?.name?.split(",")[0]} </h3>
              <p>Ward: {curMarker?.ward}</p>
              <p>Disctrict: {curMarker?.district}</p>
              <p>City: {curMarker?.city}</p>
              <a href={curMarker?.toUrl} target="_blank">
                View on Google Maps
              </a>
              <p href={curMarker?.toUrl} target="_blank">
                {curMarker?.lat} - {curMarker?.lng}
              </p>

              <select
                ref={ref}
                onChange={(e) => {
                  setCurMarker({
                    ...curMarker,
                    index: ref.current.selectedIndex - 1,
                    category: ref.current.value,
                    nameCategory: ref.current.value
                      ? e.nativeEvent.target[ref.current.selectedIndex].text
                      : e.nativeEvent.target[0].text,
                  });
                  if (categ === "all") return;
                  setCateg(ref.current.value);
                  localStorage.setItem("categ", ref.current.value);
                }}
              >
                <option>-Choose Place--</option>
                {listCategory.map((x, idx) => (
                  <option
                    value={x.value}
                    key={`${idx}-${x?.value}`}
                    data-attr={x.name}
                  >
                    {x?.name}
                  </option>
                ))}
              </select>

              {curMarker?.status === "new" ? (
                <Button
                  className={classes.save}
                  onClick={() => {
                    handleSaveMarkerCur(curMarker);
                    setIsSaved(true);
                  }}
                >
                  Save
                </Button>
              ) : null}
            </div>
          </InfoWindow>
        ) : null}
      </div>
    );
  }
);
export default CurrentMarker;
