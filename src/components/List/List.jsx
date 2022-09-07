import { Box } from "@material-ui/core";
import "@reach/combobox/styles.css";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import PlaceDetail from "../PlaceDetail";

import useStyles from "./styles.js";

function List() {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [place, setPlace] = useState({});
  const { arrList } = useContext(AppContext);

  const openPlace = (x) => {
    setPlace(x);
    setIsOpen(true);
  };

  const closePlace = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box className={classes.list}>
        <ul className={classes.items}>
          {arrList.length > 0 &&
            arrList.map((x, index) => (
              <li
                className={classes.item}
                key={index}
                onClick={() => openPlace(x)}
              >
                {x.address}
              </li>
            ))}
        </ul>
      </Box>

      <PlaceDetail
        isOpen={isOpen}
        isClose={closePlace}
        address={place.address}
        lat={place.lat}
        lng={place.lng}
      />
    </>
  );
}

export default List;
