import React, { useMemo, useRef, useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  
  const [arrList, setArrayList] = useState([]);

  return (
    <AppContext.Provider
      value={{
        map,
        setMap,
        arrList,
        setArrayList
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
