import { Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles.js";

function Schedule({ stringTime, selected, status }) {
  const classes = useStyles();

  return (
    <>
      {selected?.openHours?.periods &&
      selected?.openHours?.periods[0]?.open?.time !== "0000" ? (
        <Typography
          variant="body1"
          component="span"
          className={classes.timeText}
        >
          <Typography
            variant="body1"
            component="span"
            className={`${classes.text} ${
              selected?.openHours && selected?.openHours.isOpen === "Open"
                ? "green"
                : "red"
            }
            ${status === 1 ? "activeBlack" : ""}`}
          >
            {selected?.openHours ? selected?.openHours.isOpen : ""}
          </Typography>
          {status === 0 && selected?.openHours.isOpen === "Closed" && (
            <Typography
              variant="body1"
              component="span"
              className={classes.resultTime}
            >
              {stringTime}
            </Typography>
          )}

          {status === 0 && selected?.openHours.isOpen === "Open" && (
            <Typography
              variant="body1"
              component="span"
              className={classes.resultTime}
            >
              {stringTime}
            </Typography>
          )}

          {status === 1 && selected?.openHours.isOpen === "Open" && (
            <Typography
              variant="body1"
              component="span"
              className={classes.resultTime}
            >
              now
            </Typography>
          )}
        </Typography>
      ) : (
        <>
          {status === 1 ? (
            <Typography
              variant="body1"
              component="span"
              className={`${classes.text}
              ${status === 1 ? "activeBlack" : ""}
              `}
            >
              Open
            </Typography>
          ) : (
            <Typography
              variant="body1"
              component="span"
              className={`${classes.text} ${
                selected?.openHours && selected?.openHours.isOpen === "Open"
                  ? "green"
                  : "red"
              }`}
            >
              {navigator.language.slice(0, 2) === "vi"
                ? " Mở cả ngày"
                : "Open 24 hours"}
            </Typography>
          )}
        </>
      )}
    </>
  );
}

export default Schedule;
