import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  placeContainer: {
    transition: "0.4s",
    height: "100%",
    width: "100%",
    overflowY: "auto",
  },
  topService: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 48,
    maxHeight: 48,
    background: "#fff",
    padding: "30px 20px 0",
  },
  left: {},
  right: {},
  icon: {
    position: "relative",
    minWidth: "unset",
    width: 42,
    height: 48,
    padding: 0,
    zIndex: 1,
    marginRight: 8,

    "&:hover": {
      backgroundColor: "transparent",

      "&::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: "rgba(60,64,67,0.04)",
        width: 42,
        height: 42,
        borderRadius: "100%",
      },
    },

    "& img": {
      width: 24,
      height: 24,
      objectFit: "cover",
    },

    "&:last-child": {
      marginRight: 0,
    },

    "&.active": {
      backgroundColor: "transparent",

      "&::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: "50%",
        zIndex: -2,
        transform: "translate(-50%,-50%)",
        backgroundColor: "rgb(231,240,254)",
        width: 42,
        height: 42,
        borderRadius: "100%",
      },
    },
  },
  inputs: {
    background: "#fff",
    position: "relative",
    padding: "24px 20px 1px",

    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: 17,
      transform: "translateY(-50%)",
      backgroundRepeat: "no-repeat",
      background:
        "url(https://maps.gstatic.com/consumer/images/icons/1x/route_3dots_grey650_24dp.png)",
      width: 24,
      height: 24,
    },
  },
  input: {
    display: "flex",
    alignItems: "center",
    marginBottom: 16,

    "& img": {
      marginRight: 16,
    },

    "&:last-child": {
      marginBottom: 0,
    },
  },
  inputAdd: {
    border: "1px solid #333",
    borderRadius: 8,

    "& input": {
      minWidth: 264,
      padding: "10px 10px",
      fontSize: 14,

      "&::placeholder": {
        fontSize: 14,
      },
    },

    "&:before": {
      content: "none",
    },

    "&:after": {
      content: "none",
    },
  },
  revertLocation: {
    minWidth: "unset",
    padding: 0,
    position: "absolute",
    top: "50%",
    right: 30,
    transform: "translateY(-50%)",
  },
  vehicle: {
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    background: "#fff",
    position: "relative",
    cursor: "pointer",

    "&.active": {
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        borderLeft: "5px solid rgb(26,115,232)",
        height: "100%",
      },
    },

    "& p": {
      fontSize: 14,
      color: "rgb(32,33,36)",
      fontWeight: 500,
    },

    "& p:last-child": {
      color: "#70757a",
      fontSize: 14,
    },

    "& .left": { flex: 1 },
    "& .mid": {
      flex: 3,
      minWidth: 100,
      "& p": {
        color: "rgb(32,33,36)",
        textAlign: "left",
        fontSize: 14,
      },

      "& span": {
        color: "#70757a",
        fontSize: 14,
      },
    },

    "& .right": {
      textAlign: "right",
    },
  },
  // rgb(24,128,56)
  content: {
    background: "#fff",
    marginTop: 8,

    "& h1": {
      fontSize: 20,
      margin: 0,
      padding: "10px 20px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      "& img": {
        cursor: "pointer",
      },
    },
  },
}));
