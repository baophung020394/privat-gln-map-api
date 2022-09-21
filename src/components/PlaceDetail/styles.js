import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  placeContainer: {
    background: "#fff",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    transition: "0.4s",
    height: "100%",
    width: "100%",
    paddingBottom: 60,
    overflowY: "auto",

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

  image: {
    position: "relative",

    "& img": {
      width: 425,
      maxHeight: 300,
      minHeight: 300,
      objectFit: "cover",
    },

    "& .hoverImage": {
      position: "absolute",
      bottom: 20,
      left: 20,
      zIndex: 1,
      display: "flex",
      alignItems: "center",
      background: "#000000",
      opacity: 0,
      borderRadius: 6,
      padding: "4px 12px",
      cursor: "pointer",
      transition: "0.4s",

      "& img": {
        width: 18,
        height: 18,
        maxWidth: 18,
        maxHeight: 18,
        minHeight: 18,
        objectFit: "cover",
        marginRight: 8,
      },

      "& span": {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "bold",
      },
    },
    "&:hover": {
      "& .hoverImage": {
        opacity: 0.8,
      },
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
    marginRight: 16,
    position: "relative",

    "&.green": {
      color: "#188038",
    },
    "&.red": {
      color: "#D93025",
    },

    "&.green.activeBlack": {
      color: "#3C4043",
    },
  },

  resultTime: {
    fontSize: 14,
    color: "#3C4043",
    fontWeight: "500",
    position: "relative",

    "&::after": {
      content: '"."',
      position: "absolute",
      top: -5,
      left: -8,
      zIndex: 1,
      color: "#3C4043",
    },
  },

  timeText: {
    fontSize: 14,
    color: "#3C4043",
    position: "relative",
    fontWeight: "500",
  },

  listStar: {
    display: "flex",
    alignItems: "flex-start",
  },

  numberStar: {
    color: "#70757a",
    fontSize: 14,
    marginRight: 4,
    fontWeight: 500,
  },
  reviewRating: {
    color: "#1a73e8",
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 4,
  },
  ratingContainer: {
    position: "absolute",
    top: 0,
    left: -425,
    zIndex: 5,
    background: "#fff",
    height: "100%",
    width: 425,
    transition: "0.4s",
    overflowY: "auto",

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
  headerGallery: {
    minHeight: 64,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 12px",
    background: "#fff",
    position: 'sticky',
    top: 0,

    "& p": {
      fontSize: 18,
      color: "#202124",
      fontWeight: 500
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
  contentGallery: {},
  listImages: {
    "& img": {
      width: "100%",
      cursor: "pointer",
    },
  },
}));
