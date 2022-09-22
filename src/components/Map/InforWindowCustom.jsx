import { Button } from "@material-ui/core";
import { InfoWindow } from "@react-google-maps/api";
import React, { forwardRef } from "react";

import useStyles from "./styles.js";

const InforWindowCustom = forwardRef(
  (
    {
      selected,
      setSelected,
      setCateg,
      categ,
      listCategory,
      setIsOpenInfo,
      handleSaveMarker,
      setIsSaved,
    },
    ref
  ) => {
    const classes = useStyles();

    return (
      <InfoWindow
        zIndex={2}
        position={{ lat: selected?.lat, lng: selected?.lng }}
        onCloseClick={() => {
          setIsOpenInfo(false);
        }}
      >
        <div className="wrapper-info">
          <h3>{selected?.name?.split(",")[0]} </h3>
          <p>Ward: {selected?.ward}</p>
          <p>Disctrict: {selected?.district}</p>
          <p>City: {selected?.city}</p>
          <a href={selected?.toUrl} target="_blank">
            View on Google Maps
          </a>
          <select
            ref={ref}
            onChange={(e) => {
              setSelected({
                ...selected,
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
              <option value={x.value} key={`${idx}-${x?.value}`}>
                {x?.name}
              </option>
            ))}
          </select>

          {selected?.status === "new" ? (
            <Button
              className={classes.save}
              onClick={() => {
                handleSaveMarker(selected);
                setIsSaved(true);
              }}
            >
              Save
            </Button>
          ) : null}
        </div>
      </InfoWindow>
    );
  }
);

export default InforWindowCustom;
