import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  currentMark: {
    position: "fixed",
    top: "50%",
    left: "50%",
    zIndex: 0,
    transform: "translate(-50%,-50%)",
  },
  
  placesContainer: {
    display: 'flex',
    alignItems: 'center',
    background: "#fff",
    borderRadius: 8,
    minWidth: 200,
    position: "absolute",
    top: 10,
    zIndex: 0,
    left: "50%",
    transform: "translateX(-50%)",
    boxShadow: '0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%)',
    transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    padding: '10px 16px',
    maxHeight: 50,
    borderBottom: '1px solid transparent',
    transitionProperty: 'background,box-shadow',
    transitionDuration: '.3s',
  },
  seletedMarker: {
    transition: '0.4s',
    width: 370,
    minWidth: 370,
    marginLeft: -370
  }
}));
