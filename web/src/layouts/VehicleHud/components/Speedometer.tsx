import React, { useState } from "react";
import { createStyles } from '@mantine/core';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import {
  useSpeedValue,
  useMaxSpeedValue,
  useRpmValue,
  useGearValue,
} from "../../../state";

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
  const speed = useSpeedValue();
  const maxSpeed = useMaxSpeedValue();
  const rpm = useRpmValue();
  const gear = useGearValue();

  const speedType = 'MPH'
  return (
    <div className={classes.container}>
      <CircularProgressbar
      className={classes.progress}
      value={rpm}
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
