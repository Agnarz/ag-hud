import React, { useState } from "react";
import { createStyles } from "@mantine/core";
import { useNuiEvent } from '../../hooks/useNuiEvent';
import StatusBar from "./components/StatusBar";

const useStyles = createStyles((theme) => ({
  container: {
    position: "absolute",
    bottom: 6,
    left: 12,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignContent: "center",
    alignItems: "left",
    gap: 10,
    paddingLeft: 4,
  }
}));

export interface PlayerHudProps {
  show: boolean;
  voice: number;
  talking: boolean;
  health: number;
  isDead: boolean;
  armour: number;
  stamina: number;
  armed: boolean;
  dev: boolean;
}

const PlayerHud: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useState(true);
  const [voice, setVoice] = useState(0);
  const [voiceColor, setVoiceColor] = useState("#ffffff");
  const [voiceIcon, setVoiceIcon] = useState("fas fa-microphone");
  const [health, setHealth] = useState(0);
  const [healthColor, setHealthColor] = useState("#40C057");
  const [healthIcon, setHealthIcon] = useState("fas fa-heart");
  const [armour, setArmour] = useState(0);
  const [armourColor, setArmourColor] = useState("#1C7ED6");
  const [stamina, setStamina] = useState(0);
  const [armed, setArmed] = useState(false);
  const [vehicleVisible, setVehicleVisible] = useState(false);
  const [engine, setEngine] = useState(0);
  const [dev, setDev] = useState(false);

  useNuiEvent<PlayerHudProps>('player', (data) => {
    setVisible(data.show);
    setVoice(data.voice);
    if (data.talking) {
      setVoiceColor("#FFFF3E");
    } else {
      setVoiceColor("#ffffff");
      setVoiceIcon("fas fa-microphone");
    };

    setHealth(data.health);
    if (data.health <= 0) {
      setHealthColor("#FF0000");
      setHealthIcon("fas fa-skull-crossbones");
    } else {
      setHealthColor("#40C057");
      setHealthIcon("fas fa-heart");
    };

    setArmour(data.armour);
    if (data.armour <= 0) {
      setArmourColor("#FF0000");
    } else {
      setArmourColor("#1C7ED6");
    }

    setStamina(data.stamina);
    setArmed(data.armed);
    setDev(data.dev);
  });

  useNuiEvent('vehicle', (data) => {
    setVehicleVisible(data.show);
    setEngine(data.engine)
  });

  return (
    <>
      {visible && (
        <div className={classes.container}>
          <StatusBar visible={true} value={voice} maxValue={6} color={voiceColor} icon={voiceIcon} />
          <StatusBar visible={true} value={health} color={healthColor} icon={healthIcon} />
          <StatusBar visible={true} value={armour} color={armourColor} icon="fas fa-shield-alt" />
          <StatusBar visible={true} value={stamina} color="#8aa8bd" icon="fas fa-lungs" />
          <StatusBar visible={armed} value={100} color="#D6336C" icon="fas fa-stream" />
          {vehicleVisible && (<StatusBar visible={true} value={engine} color="#FA5252" icon="fas fa-oil-can" />)}

          <StatusBar visible={dev} value={100} color="#000000" icon="fas fa-terminal" />
        </div>
      )}
    </>
  );
};

export default PlayerHud;