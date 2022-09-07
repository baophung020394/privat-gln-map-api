import { Box, CssBaseline, Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import AppProvider from "./context/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <CssBaseline />
        <Header />
        <Grid
          container
          style={{
            width: "100%",
            height: "calc(100vh - 55px)",
          }}
        >
          <Box className="map-wrapper">
            <Switch>
              <Route path="/maps">
                <Map />
              </Route>
            </Switch>
          </Box>
        </Grid>
      </AppProvider>
    </>
  );
}

export default App;
