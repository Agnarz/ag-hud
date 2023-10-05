import { createStyles } from "@mantine/core";
import { useNuiEvent } from '../../hooks/useNuiEvent';
import FuelGauge from "./components/FuelGauge";
import Speedometer from "./components/Speedometer";
import Indicators from "./components/Indicators";

import {
  useShowVehicle,
  useSetSpeed,
  useSetMaxSpeed,
  useSetRpm,
  useSetGear,
  useSetFuel,
  useSetEngine,
  useSetSeatbelt,
  useSetLocked
} from "../../state";

const useStyles = createStyles(() => ({
  container: {
    display: "flex",
    position: "absolute",
    left: 352,
    bottom: 174
  }
}));

const VehicleHud: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useShowVehicle();
  const setSpeed = useSetSpeed();
  const setMaxSpeed = useSetMaxSpeed();
  const setRpm = useSetRpm();
  const setGear = useSetGear();
  const setFuel = useSetFuel();
  const setEngine = useSetEngine();
  const setSeatbelt = useSetSeatbelt();
  const setLocked = useSetLocked();

  useNuiEvent("vehicle", (data) => {
    setVisible(data.show);
    setSpeed(data.speed);
    setMaxSpeed(data.maxSpeed);
    setRpm(data.rpm);
    setGear(data.gear);
    setFuel(data.fuel);
    setEngine(data.engine);
    setSeatbelt(data.seatbelt);
    if (data.locked  == (0 || 1) ) {
      setLocked(false);
    } else {
      setLocked(true);
    }
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
