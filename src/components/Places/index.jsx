import { Box, Button, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import React, { forwardRef, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { AppContext } from "../../context/AppProvider";
import useStyles from "./styles.js";

const PlacesAutocomplete = forwardRef(
  (
    {
      panTo,
      setCurMarker,
      setListMarkerSaved,
      setIsOpenPlace,
      selected,
      curMarker,
      centerChanged,
      setCenterChanged,
    },
    ref
  ) => {
    const [isValue, setIsValue] = useState(null);

    const classes = useStyles();

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

      console.log({ results });

      const request = {
        placeId: results[0]?.place_id,
      };

      const service = new google.maps.places.PlacesService(
        ref.current
      ); /*global google*/

      service.getDetails(request, function (place, status) {
        if (
          status ===
            google.maps.places.PlacesServiceStatus.OK /*global google*/ &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          let listPhoto = [];
          if (place?.photos) {
            place?.photos.forEach((x) => listPhoto.push(x.getUrl()));
          }

          // const stringAddress = data[0]?.description.split(",");
          const stringAddress = results[0]?.formatted_address.split(",");

          newObj = {
            address: results[0]?.formatted_address,
            name: stringAddress[0],
            ward: stringAddress[1],
            district: stringAddress[2],
            city: stringAddress[3],
            lng: newObj.lng,
            lat: newObj.lat,
            plusCode: results[0]?.plus_code
              ? results[0]?.plus_code?.compound_code
              : "No plus code",
            placeId: results[0]?.place_id
              ? results[0]?.place_id
              : "No place id",
            photos: listPhoto,
            toUrl: `https://www.google.com/maps/?q=${newObj.lat},${newObj.lng}`,
            time: new Date(),
            status: "new",
            imgSave: "",
          };

          setIsValue(newObj);
        }
      });
    };

    const handleSubmit = async () => {
      if (!isValue) return;
      setCurMarker(null);
      setListMarkerInput((current) => [...current, isValue]);
      await setCenterChanged(null);
      await panTo({ lat: isValue?.lat, lng: isValue?.lng });
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
            <ComboboxPopover style={{ zIndex: 9 }}>
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
);

// function PlacesAutocomplete({
//   panTo,
//   setCurMarker,
//   setListMarkerSaved,
//   setIsOpenPlace,
//   selected,
//   curMarker,
//   centerChanged,
//   setCenterChanged,
//   ref,
// }) {
//   const [isValue, setIsValue] = useState(null);

//   const classes = useStyles();

//   const { setListMarkerInput } = React.useContext(AppContext);

//   console.log(ref?.current);
//   const {
//     ready,
//     value,
//     setValue,
//     suggestions: { status, data },
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address) => {
//     setValue(address, false);
//     clearSuggestions();

//     console.log({ status });
//     console.log({ data });
//     const results = await getGeocode({ address });
//     const objLo = await getLatLng(results[0]);
//     let newObj = { ...objLo };

//     console.log({ results });
//     console.log(results[0].geometry);
//     // const stringAddress = data[0]?.description.split(",");
//     const stringAddress = results[0]?.formatted_address.split(",");

//     newObj = {
//       address: results[0]?.formatted_address,
//       name: stringAddress[0],
//       ward: stringAddress[1],
//       district: stringAddress[2],
//       city: stringAddress[3],
//       lng: newObj.lng,
//       lat: newObj.lat,
//       plusCode: results[0]?.plus_code?.compound_code,
//       placeId: results[0]?.place_id,
//       toUrl: `https://www.google.com/maps/?q=${newObj.lat},${newObj.lng}`,
//       time: new Date(),
//       status: "new",
//       imgSave: "",
//     };

//     setIsValue(newObj);
//   };

//   const handleSubmit = async () => {
//     if (!isValue) return;
//     setCurMarker(null);
//     setListMarkerInput((current) => [...current, isValue]);
//     await setCenterChanged(null);
//     await panTo({ lat: isValue?.lat, lng: isValue?.lng });
//   };

//   return (
//     <>
//   <Box className={classes.searchBox}>
//     <Combobox onSelect={handleSelect} className={classes.searchInput}>
//       <ComboboxInput
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         className={`${classes.input} combobox-input`}
//         placeholder="Search an address"
//       />
//       <ComboboxPopover style={{ zIndex: 9 }}>
//         <ComboboxList>
//           {status === "OK" &&
//             data.map(({ place_id, description }) => (
//               <ComboboxOption key={place_id} value={description} />
//             ))}
//         </ComboboxList>
//       </ComboboxPopover>
//     </Combobox>

//     <Button
//       className={classes.buttonSubmit}
//       onClick={handleSubmit}
//       disabled={value.length <= 0}
//     >
//       <SearchIcon style={{ width: 20, height: 20, marginLeft: 16 }} />
//     </Button>

//     {selected || curMarker ? (
//       <Button
//         className={classes.buttonClose}
//         onClick={() => setIsOpenPlace(false)}
//       >
//         <Typography
//           variant="body1"
//           component="span"
//           className="iconClose"
//         ></Typography>
//       </Button>
//     ) : null}

//     {/* {value  ? (
//       <Button className={classes.buttonClose} onClick={() => setValue("")}>
//         <Typography
//           variant="body1"
//           component="span"
//           className="iconClose"
//         ></Typography>
//       </Button>
//     ) : null} */}
//   </Box>
// </>
//   );
// }

export default PlacesAutocomplete;
