import React, { useMemo, useRef, useState } from "react";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [listMarkerInput, setListMarkerInput] = useState([]);
  const [listMarkerSaved, setListMarkerSaved] = useState([]);

  return (
    <AppContext.Provider
      value={{
        listMarkerInput,
        setListMarkerInput,
        listMarkerSaved,
        setListMarkerSaved,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
