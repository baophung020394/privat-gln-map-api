import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  currentMark: {
    position: "absolute",
    top: "51%",
    left: "50%",
    zIndex: 0,
    transform: "translate(-50%,-50%)",
    // background: "url(https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png)",
    backgroundSize: "cover",
    width: 30,
    height: 30,
    cursor: "pointer",
    transition: '0.4s',

    "&.shadow": {
      top: "48%",
    },

    '&.displayNone': {
      display: 'none'
    }
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateY(-200%)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },

  topHeader: {
    position: "absolute",
    top: 10,
    zIndex: 1,
    left: 10,
    // left: '52%',
    // transform: "translateX(-50%)",
    display: "flex",
  },

  optionsChoose: {
    display: 'flex',

    "& button": {
      background: "#fff",
      border: "none",
      alignItems: "center",
      borderRadius: 32,
      color: "rgb(60,64,67)",
      cursor: "inherit",
      display: "flex",
      height: 32,
      margin: "8px 0",
      padding: "0 12px",
      textTransform: "initial",
      boxShadow:
        "0 1px 2px rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
      marginRight: 8,
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: 15,
    },
  },
  btnOption: {
    "&:hover": {
      background: "#fff",
    },
  },

  placesContainer: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: 8,
    minWidth: 200,
    boxShadow: "0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    padding: "10px 16px",
    maxHeight: 48,
    borderBottom: "1px solid transparent",
    transitionProperty: "background,box-shadow",
    transitionDuration: ".3s",
    marginRight: 16,
  },

  seletedMarker: {
    transition: "0.4s",
    width: 390,
    minWidth: 390,
    marginLeft: -390,
    position: "fixed",
    top: 55,
    left: 0,
    zIndex: 0,
    height: "100%",
  },

  save: {
    background: "#fff",
    border: "none",
    alignItems: "center",
    borderRadius: 32,
    color: "rgb(60,64,67)",
    cursor: "inherit",
    display: "flex",
    margin: "8px 0",
    padding: "0 12px",
    textTransform: "initial",
    boxShadow:
      "0 1px 2px rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
    marginLeft: 1,
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 15,
  },
}));
