import { AppBar, Box, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles.js";

function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" style={{position: 'relative', zIndex: 3}}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          GLN Map
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
          </Typography>
          {/* <Autocomplete > */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
