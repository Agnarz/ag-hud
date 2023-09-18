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
  const [voiceValue, setVoice] = useState(0);
  const [voiceColor, setVoiceColor] = useState("#ffffff");
  const [voiceIcon, setVoiceIcon] = useState("fas fa-microphone");
  const [healthValue, setHealth] = useState(0);
  const [healthColor, setHealthColor] = useState("#40C057");
  const [healthIcon, setHealthIcon] = useState("fas fa-heart");
  const [armourValue, setArmour] = useState(0);
  const [armourColor, setArmourColor] = useState("#1C7ED6");
  const [staminaValue, setStamina] = useState(0);
  const [armedValue, setArmed] = useState(false);
  const [devValue, setDev] = useState(false);

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
  })

  return (
    <>
      {visible && (
        <div className={classes.container}>
          <StatusBar visible={true} value={voiceValue} maxValue={6} color={voiceColor} icon={voiceIcon} />
          <StatusBar visible={true} value={healthValue} color={healthColor} icon={healthIcon} />
          <StatusBar visible={true} value={armourValue} color={armourColor} icon="fas fa-shield-alt" />
          <StatusBar visible={true} value={staminaValue} color="#8aa8bd" icon="fas fa-lungs" />
          <StatusBar visible={armedValue} value={100} color="#D6336C" icon="fas fa-stream" />
          <StatusBar visible={devValue} value={100} color="#000000" icon="fas fa-terminal" />
        </div>
      )}
    </>
  );
};

export default PlayerHud;