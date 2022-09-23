import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  buttonDirection: {
    minWidth: "unset",
    padding: 0,
    marginRight: 16,
    opacity: "0.8",

    "&:hover": {
      opacity: 1,
    },

    "& img": {
      width: 18,
      height: 18,
      objectFit: "cover",
    },
  },
  directions: {
    background: "#e8eaed",
    transition: "0.4s",
    width: 425,
    minWidth: 425,
    marginLeft: -425,
    position: "fixed",
    top: 55,
    left: 0,
    zIndex: 1,
    height: "100%",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
  },
  currentMark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 0,
    transform: "translate(-50%,-50%)",
    // background: "url(https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png)",
    backgroundSize: "cover",
    width: 30,
    height: 30,
    cursor: "pointer",
    transition: "0.4s",

    "&.shadow": {
      top: "48%",
    },

    "&.displayNone": {
      display: "none",
    },
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
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    paddingRight: 10,
    [theme.breakpoints.down(768)]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },

  optionsChoose: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",

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
    marginRight: 8,
    "&:hover": {
      background: "#fff",
    },
  },

  placesContainer: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    padding: "10px 16px",
    maxHeight: 48,
    borderBottom: "1px solid transparent",
    transitionProperty: "background,box-shadow",
    transitionDuration: ".3s",
    marginRight: 16,

    [theme.breakpoints.down(768)]: {},
  },

  seletedMarker: {
    transition: "0.4s",
    width: 425,
    minWidth: 425,
    marginLeft: -425,
    position: "fixed",
    top: 55,
    left: 0,
    zIndex: 0,
    height: "100%",
    // overflowX: 'hidden'
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

  listCategory: {
    position: "absolute",
    right: 10,
    bottom: 10,
    zIndex: 0,
    display: "flex",
    flexDirection: "column",
  },

  btnCategory: {
    position: "relative",
    minWidth: "unset",
    padding: 0,
    margin: "0 0 8px 0",
    width: 30,
    height: 30,
    borderRadius: "100%",
    background: "#fff",
    border: "none",
    color: "rgb(60,64,67)",
    cursor: "inherit",
    textTransform: "initial",
    boxShadow:
      "0 1px 2px rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 15,

    "&:hover": {
      background: "#fff",
      backgroundColor: "#fff",

      "&::before": {
        content: `${"attr(data-hover)"}`,
        position: "absolute",
        top: -30,
        right: 0,
        textTransform: "initial",

        color: "rgb(60,64,67)",
        fontSize: 14,
        fontWeight: "bold",
        background: "#fff",
        border: "none",
        borderRadius: 32,
        height: 32,
        lineHeight: "32px",
        padding: "0 10px",
        boxShadow:
          "0 1px 2px rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
      },
    },

    "& img": {
      width: 25,
      height: 25,
      borderRadius: "100%",
      objectFit: "contain",
    },
  },

  wrapBtnsNear: {
    width: "100%",
    maxWidth: 500,
    marginRight: 30,
    "& .slideBtn": {
      color: "rgb(60,64,67)",
      fontSize: 14,
      fontWeight: "bold",
      background: "#fff",
      border: "none",
      borderRadius: 32,
      height: 32,
      padding: "0 5px",
      boxShadow:
        "0 1px 2px rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)",
    },
    "& button": {
      marginRight: 8,
    },
    "& .section-outstanding__slider": {
      // display: "none",
      maxHeight: 52,

      "& .slick-prev": {
        "&::before": {
          color: "#000",
        },
      },
      "& .slick-next": {
        "&::before": {
          color: "#000",
        },
      },
      "& .slick-slide": {
        marginRight: 8,
      },
      // "& .slick-list": {
      //   margin: "0 -27px",
      // },
    },
  },

  nearMeContainer: {
    position: "absolute",
    top: 0,
    left: -425,
    zIndex: 5,
    background: "#fff",
    height: "100%",
    width: 425,
    transition: "0.4s",
    overflowY: "auto",
    boxShadow: "0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%)",
    paddingBottom: 60,

    "&:hover": {
      overflowY: "auto",
    },

    "&::-webkit-scrollbar": {
      width: 4,
    },
    "&::-webkit-scrollbar-track ": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb ": {
      background: "#888",
    },
    "&::-webkit-scrollbar-thumb:hover ": {
      background: "#555",
    },
  },

  headerNearMe: {
    minHeight: 64,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 12px",
    background: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 2,
    boxShadow:
      "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",

    "& p": {
      fontSize: 18,
      color: "#202124",
      fontWeight: 500,
    },
  },
  backIcon: {
    minWidth: "unset",
    padding: 0,

    "& img": {
      width: 24,
      height: 24,
      objectFit: "cover",
      cursor: "pointer",
    },
  },
  contentPlaces: {
    marginTop: 16,
  },
  placeDetailNearMe: {},
  listPlacesDetail: {},
  placeDetail: {
    display: "flex",
    marginBottom: 16,
    borderBottom: "1px solid #e8eaed",

    "& .rating": {
      display: "flex",
      alignItems: "center",
    },

    "& h2": {
      fontSize: 16,
      fontWeight: "bold",
    },

    "& span.number": {
      color: "#70757a",
      fontSize: 14,
      marginRight: 3,
    },

    "& .ratingstar": {
      fontSize: 15,
      marginRight: 3,
    },

    "& .openTime": {
      fontSize: 14,
      "&.green": {
        color: "#188038",
      },
      "&.red": {
        color: "#D93025",
      },
    },
  },
  leftPlaceDetail: {
    flex: 3,
    padding: 15,
  },
  rightPlaceDetail: {
    flex: 1,
    "& img": {
      width: 84,
      height: 84,
      objectFit: "cover",
      borderRadius: 12,
    },
  },
}));
