import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  searchBox: {
    display: "flex",
    alignItems: "center",
    order: 0,
    marginRight: 8,
    
  },

  buttonSubmit: {
    background: "transparent",
    backgroundColor: "transparent",
    borderRadius: 0,
    minWidth: "auto",
    padding: "4px 16px 4px 0",
    width: 20,
    height: 20,
    marginRight: 8,

    "&:hover": {
      background: "transparent",
      backgroundColor: "transparent",
    },
  },

  buttonClose: {
    background: "transparent",
    backgroundColor: "transparent",
    borderRadius: 0,
    padding: 0,
    minWidth: "auto",

    width: 20,
    height: 20,

    "&:hover": {
      background: "transparent",
      backgroundColor: "transparent",
    },

    "& .iconClose": {
      backgroundImage:
        "url(https://maps.gstatic.com/consumer/images/icons/1x/close_grey800_24dp.png)",
      backgroundSize: "20px 20px",
      padding: "4px 16px 4px 0",
      backgroundRepeat: "no-repeat",
      width: 20,
      height: 20,
    },
  },
  input: {
    background: "#fff",
    width: "100%",
    height: 40,
    border: "none",
    borderRadius: 4,
    minWidth: 250,
    fontSize: 15,

    "&::placeholder": {
      fontSize: 15,
    },

    "&:focus-visible": {
      border: "none",
      outline: "none",
    },
  },
  searchInput: {
    flex: 3,
    marginRight: 16
  },
}));
