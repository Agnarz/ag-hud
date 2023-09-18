import React, { useState } from "react";
import { createStyles } from '@mantine/core';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import 'react-circular-progressbar/dist/styles.css';

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    color: "white",
    width: 48,
    height: 48,
    borderRadius: "100%",
    left: 58,
    top: 50,
  },
  progress: {
    position: "absolute"
  },
  icon: {
    position: "relative",
    fontSize: 18,
    bottom: 4,
  },
}));

const Speedometer: React.FC = () => {
  const { classes } = useStyles();
  const [fuel , setFuel] = useState(0);

  useNuiEvent("vehicle", (data) => {
    setFuel(data.fuel);
  });

  return (
    <div className={classes.container}>
      <CircularProgressbar
        className={classes.progress}
        value={fuel}
        circleRatio={0.60}
        maxValue={100}
        strokeWidth={12}
        styles={{
          root: {
            transform: "rotate(-108deg)",
          },
          path: {
            strokeLinecap: 'butt',
            stroke: "white",
          },
          trail: {
            strokeLinecap: 'butt',
            stroke: "#ffffff66",
          },
          text: {
            transform: "rotate(90deg)",
            fill: "white",
          }
        }}
      />
      <div className={classes.icon}>
        <i className="fas fa-gas-pump" />
      </div>
    </div>
  );
};

export default Speedometer;
