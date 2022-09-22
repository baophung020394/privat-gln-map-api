import { Marker } from "@react-google-maps/api";
import React from "react";

function ListMarkerInput({
  listMarkerInput,
  setSelected,
  setIsOpenPlace,
  setIsOpenInfo,
  setIsOpenInfoDrag,
  setIsSaved,
}) {
  return (
    <>
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
    </>
  );
}

export default ListMarkerInput;
