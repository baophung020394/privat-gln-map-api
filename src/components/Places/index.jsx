import React, { useRef, useState } from "react";

import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@material-ui/icons/Search";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import "@reach/combobox/styles.css";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";

import { AppContext } from "../../context/AppProvider";
import {
  Box,
  Button,
  Icon,
  Input,
  makeStyles,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles.js";

function PlacesAutocomplete({
  panTo,
  setCurMarker,
  setListMarkerSaved,
  setIsOpenPlace,
  selected,
  curMarker,
}) {
  const [isValue, setIsValue] = useState(null);

  const classes = useStyles();

  const center = { lat: 10.7670948, lng: 106.7015026 };

  const { setListMarkerInput } = React.useContext(AppContext);

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const objLo = await getLatLng(results[0]);
    let newObj = { ...objLo };

    const stringAddress = results[0]?.formatted_address.split(",");

    newObj = {
      address: results[0].formatted_address,
      name: stringAddress[0],
      ward: stringAddress[1],
      district: stringAddress[2],
      city: stringAddress[3],
      lng: newObj.lng,
      lat: newObj.lat,
      toUrl: `https://www.google.com/maps/?q=${newObj.lat},${newObj.lng}`,
      time: new Date(),
      status: "new",
      imgSave:
        "https://cdn3.iconfinder.com/data/icons/map-markers-1/512/market-512.png",
    };

    setIsValue(newObj);
  };

  const handleSubmit = () => {
    if (!isValue) return;
    setListMarkerInput((current) => [...current, isValue]);

    setCurMarker(null);
    panTo({ lat: isValue.lat, lng: isValue.lng });
  };

  return (
    <>
      <Box className={classes.searchBox}>
        <Combobox onSelect={handleSelect} className={classes.searchInput}>
          <ComboboxInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!ready}
            className={`${classes.input} combobox-input`}
            placeholder="Search an address"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>

        <Button
          className={classes.buttonSubmit}
          onClick={handleSubmit}
          disabled={value.length <= 0}
        >
          <SearchIcon style={{ width: 20, height: 20, marginLeft: 16 }} />
        </Button>

        {selected || curMarker ? (
          <Button
            className={classes.buttonClose}
            onClick={() => setIsOpenPlace(false)}
          >
            <Typography
              variant="body1"
              component="span"
              className="iconClose"
            ></Typography>
          </Button>
        ) : null}

        {/* {value  ? (
          <Button className={classes.buttonClose} onClick={() => setValue("")}>
            <Typography
              variant="body1"
              component="span"
              className="iconClose"
            ></Typography>
          </Button>
        ) : null} */}
      </Box>
    </>
  );
}

export default PlacesAutocomplete;
