import { InfoWindow, Marker } from "@react-google-maps/api";
import React from "react";

function NearByMe({
  list,
  selected,
  setSelected,
  setIsOpenPlace,
  setIsOpenInfo,
  setIsSaved,
}) {
  console.log({ list });
  console.log({ selected });
  return (
    <>
      {list?.length > 0 &&
        list.map((x, index) => (
          <Marker
            // draggable={true}
            key={`${x.geometry?.location?.lat()}-${index}`}
            position={{
              lat:
                x.geometry?.location?.lat() ||
                selected.geometry?.location?.lat(),
              lng:
                x.geometry?.location?.lng() ||
                selected.geometry?.location?.lat(),
            }}
            onClick={() => {
              setSelected(x);
              // setIsOpenPlace(true);
              // setIsOpenInfo(true);
              // setIsOpenInfoDrag(false);
              // setIsSaved(false);
            }}
            // icon={{
            //   url: `www.elergonomista.com/wp-content/uploads/2019/05/h30.gif`,
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(15, 15),
            //   scaledSize: new window.google.maps.Size(50, 50),
            // }}
          />
        ))}

      {selected && (
        <InfoWindow
          zIndex={2}
          position={{ lat: selected?.lat, lng: selected?.lng }}
          // onCloseClick={() => {
          //   setIsOpenInfo(false);
          // }}
        >
          <div className="wrapper-info">
            <h3>{selected?.name?.split(",")[0]} </h3>
            <p>Ward: {selected?.ward}</p>
            <p>Disctrict: {selected?.district}</p>
            <p>City: {selected?.city}</p>
            <a href={selected?.toUrl} target="_blank">
              View on Google Maps
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default NearByMe;
