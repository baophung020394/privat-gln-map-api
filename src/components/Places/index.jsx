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

function PlacesAutocomplete({ panTo }) {
  const [isValue, setIsValue] = useState(null);

  const classes = useStyles();

  const center = { lat: 10.7670948, lng: 106.7015026 };

  const { setArrayList } = React.useContext(AppContext);

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
    console.log({ address });
    const results = await getGeocode({ address });
    const objLo = await getLatLng(results[0]);
    let newObj = { ...objLo };

    console.log({ results });
    newObj = {
      address: results[0].formatted_address,
      lng: newObj.lng,
      lat: newObj.lat,
      time: new Date(),
    };

    setIsValue(newObj);
  };

  const handleSubmit = () => {
    if (!isValue) return;
    setArrayList((oldArray) => [...oldArray, isValue]);

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

        {value ? (
          <Button className={classes.buttonClose} onClick={() => setValue("")}>
            <Typography
              variant="body1"
              component="span"
              className="iconClose"
            ></Typography>
          </Button>
        ) : null}
      </Box>
    </>
  );
}

export default PlacesAutocomplete;
