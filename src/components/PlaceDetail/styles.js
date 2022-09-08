import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  placeContainer: {
    background: "#fff",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    transition: "0.4s",
    height: "100%",
    width: "100%",
  },

  image: {
    "& img": {
      width: "100%",
    },
  },

  content: {  },

  top: {
    "& p": {
      fontWeight: "bold",
    },
  },

  bot: {
    display: "flex",
    justifyContent: "space-between",
    "& span": {},
  },

  botItem: {
    cursor: "pointer",
    marginTop: 16,
    "& img": {
      width: 24,
      height: 24,
      objectFit: "contain",
    },
  },

  title: {
    // margin: "15px 0",
    fontSize: 22,
    fontWeight: "400 !important",
    borderBottom: '1px solid #e8eaed',
    padding: '5px 10px'
  },

  location: {
    fontSize: 14,
    fontStyle: "italic",
    textDecoration: "underline",
    display: "inline-block",
    marginRight: 8,
  },

  layer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    background: "transparent",
    // background: "rgba(0, 0, 0, 0.8)",

    filter: "blur(4px)",
  },

  listImage: {
    marginTop: 16,
    cursor: "pointer",
    "& img": {
      width: 70,
      height: 70,
      objectFit: "contain",
      marginRight: 8,
    },
  },

  listContainer: {
    listStyle: "none",
    padding: "0 10px",
  },

  item: {
    display: "flex",
    alignItems: "center",

    '& p': {
      fontWeight: 400,
      fontSize: 14,
      color: 'rgb(60,64,67)',
      lineHeight: '20px'
    },

    "& img": {
      width: 24,
      height: 24,
      objectFit: "cotain",
      marginRight: 16,
    },
  },
}));
