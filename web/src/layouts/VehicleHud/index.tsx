import React, { useState } from "react";
import { createStyles } from "@mantine/core";
import { useNuiEvent } from '../../hooks/useNuiEvent';
import FuelGauge from "./components/FuelGauge";
import Speedometer from "./components/Speedometer";
import Indicators from "./components/Indicators";

const useStyles = createStyles((theme) => ({
  container: {
    display: "flex",
    position: "absolute",
    left: 352,
    bottom: 174,
  },
  compass: {
    position: "fixed",
    bottom: 68,
    color: 'white',
    fontSize: 20,
    fontWeight: 600,
    width: '100%'
  }
}));

const VehicleHud: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(false);

  useNuiEvent("vehicle", (data) => {
    setVisible(data.show);
  });

  return (
    <>
      {visible && (
        <div className={classes.container}>
          <Speedometer />
          <FuelGauge />
          <Indicators />
        </div>
      )}
    </>
  );
};

export default VehicleHud;
