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
    position: "fixed",
    top: 70,
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
}));
