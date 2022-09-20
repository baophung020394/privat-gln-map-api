import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  placeContainer: {
    background: "#fff",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    transition: "0.4s",
    height: "100%",
    width: "100%",
    overflowY: "auto",
  },

  image: {
    "& img": {
      width: "100%",
      maxHeight: 300,
      minHeight: 300,
      objectFit: "cover",
    },
  },

  content: {},

  top: {
    display: "flex",
    alignItems: "flex-start",
    borderBottom: "1px solid #e8eaed",

    padding: "8px 15px",
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
    fontSize: 22,
    fontWeight: "400 !important",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  subTitle: {
    color: "#70757a",
    fontSize: 14,
  },

  iconTitle: {
    width: 30,
    height: 30,
    objectFit: "contain",
    marginRight: 8,
    marginTop: 5,
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
    padding: "8px 0",
    margin: 0,
    borderBottom: "1px solid #e8eaed",
  },

  item: {
    display: "flex",
    alignItems: "center",
    padding: "8px 24px",
    position: "relative",

    "& p": {
      fontWeight: 400,
      fontSize: 14,
      color: "rgb(60,64,67)",
      lineHeight: "20px",
    },

    "& img": {
      width: 24,
      height: 24,
      objectFit: "contain",
      marginRight: 16,
    },

    "&.times": {
      "& img": {
        position: "absolute",
        top: 32,
        left: 20,
        zIndex: 1,
        transform: "translateY(-50%)",
      },

      "& .MuiPaper-root.MuiAccordion-root": {
        width: "100%",
        marginTop: 0,
        marginLeft: 40,

        "& .MuiAccordionSummary-root.Mui-expanded": {
          minHeight: "auto",
        },
        "& p": {
          marginLeft: 0,
        },
      },
    },
  },
  timesAccordion: {
    marginLeft: 40,
    borderRadius: "0 !important",
    boxShadow: "none",

    "&::before": {
      content: "none",
    },
  },
  timeAccordion: {
    padding: 0,
  },
  weekdayTextContainer: {
    flexDirection: "column",
    padding: "0 18px",
  },
  weekdayText: {
    width: "100%",
    padding: "10px 0",

    "&.active": {
      fontWeight: "bold",
    },
  },

  text: {
    fontSize: 14,
    "&.green": {
      color: "#188038",
    },
    "&.red": {
      color: "#D93025",
    },
  },

  timeText: {
    fontSize: 14,
    color: "#3C4043",
    position: "relative",
    marginLeft: 16,

    "&::before": {
      content: '"."',
      position: "absolute",
      top: -5,
      left: -8,
      zIndex: 1,
      color: "#3C4043",
    },
  },

  listStar: {
    display: "flex",
    alignItems: "flex-start",
  },

  numberStar: {
    color: "#70757a",
    fontSize: 14,
    marginRight: 4,
    fontWeight: 500
  },
  reviewRating: {
    color: "#1a73e8",
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 4
  }
}));
