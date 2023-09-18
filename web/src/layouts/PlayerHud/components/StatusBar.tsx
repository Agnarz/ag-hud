import React, { useState } from "react";
import { createStyles } from "@mantine/core";
import ScaleFade from "../../../transitions/ScaleFade";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface StatusBarProps {
  visible: boolean;
  value: number;
  maxValue?: number;
  color: string;
  icon: string;
  ratio?: number;
  strokeWidth?: number;
}

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    position: "relative",
    width: 52,
    height: 52,
  },
  iconContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.dark[7],
    height: 38,
    width: 38,
    borderRadius: "100%",
  },
}));

const StatusBar: React.FC<StatusBarProps> = (props) => {
  const { classes } = useStyles();

  return (
    <ScaleFade visible={props.visible}>
      <div className={classes.container}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "100%",
            opacity: 0.4,
            background: props.color,
            boxShadow: `0px 0px 2px 2px ${props.color}f2`,
          }}
        />
        <CircularProgressbarWithChildren
          value={props.value}
          maxValue={props.maxValue}
          circleRatio={props.ratio}
          strokeWidth={12}
          styles={{
            root: {},
            trail: {
              strokeLinecap: "round",
              stroke: "#00000000",
            },
            path: {
              strokeLinecap: "round",
              stroke: props.color,
            },
          }}
        >
          <div className={classes.iconContainer}>
            <i className={props.icon} style={{ fontSize: 19, color: "white" }} />
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </ScaleFade>
  );
};

export default StatusBar;
