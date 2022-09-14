import { Box, CssBaseline, Grid } from "@material-ui/core";
import { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import AppProvider from "./context/AppProvider";

function App() {
  const [list] = useState([
    { id: 0, name: "a" },
    { id: 1, name: "b" },
    { id: 2, name: "c" },
    { id: 3, name: "d" },
  ]);
  let arr1 = [];
  const handleClick = (value, idx) => {
    let obj = { ...value };

    const index = arr1.indexOf(value.name);
    console.log(index);
    index === -1 ? arr1.push(value) : arr1.splice(index, 1);
    console.log(arr1);
    // arr1.push(obj)
    // arr2.push({...obj});
    // arr1.push(...arr2)

    // console.log(arr1);
  };

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
              <Redirect exact from="/" to="/maps" />
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
