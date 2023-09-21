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
    fontSize: 22,
    fontWeight: 700,
    color: "white",
    width: 84,
    height: 84,
    fontFamily: 'Noto Sans, sans-serif',
    borderRadius: "100%",
  },
  progress: {
    position: "absolute"
  },
  speed: {
    position: "relative",
    bottom: 4
  },
  speedType: {
    position: "relative",
    fontSize: 14,
    bottom: 4,
  },
  gear: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 60
  }
}));

const Speedometer: React.FC = () => {
  const { classes } = useStyles();
  const [speed , setSpeed] = useState(0);
  const [maxSpeed , setMaxSpeed] = useState(0);
  const [rpmValue , setRpmValue] = useState(0);
  const [gear , setGear] = useState(0);

  useNuiEvent("vehicle", (data) => {
    setSpeed(data.speed);
    setMaxSpeed(data.maxSpeed);
    setRpmValue(data.rpm);
    setGear(data.gear);
  });

  const speedType = 'MPH'
  return (
    <div className={classes.container}>
      <CircularProgressbar
      className={classes.progress}
      value={rpmValue}
      circleRatio={0.68}
      maxValue={1}
      strokeWidth={10}
      styles={{
        root: {
          transform: "rotate(-152deg)",
        },
        path: {
          strokeLinecap: 'butt',
          stroke: "#ff000077",
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
      <CircularProgressbar
        className={classes.progress}
        value={speed}
        circleRatio={0.68}
        maxValue={maxSpeed}
        strokeWidth={10}
        styles={{
          root: {
            transform: "rotate(-152deg)",
          },
          path: {
            strokeLinecap: 'butt',
            stroke: "white",
          },
          trail: {
            strokeLinecap: 'butt',
            stroke: "#ffffff00",
          },
          text: {
            transform: "rotate(90deg)",
            fill: "white",
          }
        }}
      />
      <div className={classes.speed}>{speed}</div>
      <div className={classes.speedType}>{speedType}</div>
      <div className={classes.gear}>{gear}</div>
    </div>
  );
};

export default Speedometer;
