import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  locate: {
    background: "#fff",
    border: "none",
    cursor: "pointer",
    width: 18,
    height: 18,
    borderRadius: "100%",
    order: 1,
    padding: 0,

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  btnLocation: {
    // backgroundColor: "#fff",
    // borderRadius: 8,
    // boxShadow: "0 1px 4px rgb(0 0 0 / 30%)",
    // height: 29,
    // width: 29,
    // textAlign: 'center',
    // position: 're'
  },

  myLocation: {
    backgroundImage:
      "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)",
    backgroundSize: "180px 18px",
    backgroundPosition: "0 0",
    width: 18,
    height: 18,
    margin: 0,
    "&:hover": {
      backgroundPosition: "-36px 0",
    },
  },
}));
