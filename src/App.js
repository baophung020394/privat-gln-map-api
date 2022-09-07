import { Box, CssBaseline, Grid } from "@material-ui/core";
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
            <Map />
          </Box>
        </Grid>
      </AppProvider>
    </>
  );
}

export default App;
