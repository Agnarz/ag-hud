import { useState } from "react";
import { createStyles } from "@mantine/core";
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { PlayerHudProps } from '../../types';
import StatusBar from "./components/StatusBar";
import {
  useShowPlayer,
  useVoice,
  useHealth,
  useArmour,
  useHunger,
  useThirst,
  useStress,
  useStamina,
  useArmed,
  useDev,
  useShowVehicleValue,
  useEngineValue
} from "../../state";

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
    paddingLeft: 4
  }
}));

const PlayerHud: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = useShowPlayer();
  const [voice, setVoice] = useVoice();
  const [voiceColor, setVoiceColor] = useState("#ffffff");
  const [voiceIcon, setVoiceIcon] = useState("fas fa-microphone");
  const [health, setHealth] = useHealth();
  const [healthColor, setHealthColor] = useState("#40C057");
  const [healthIcon, setHealthIcon] = useState("fas fa-heart");
  const [armour, setArmour] = useArmour();
  const [armourColor, setArmourColor] = useState("#1C7ED6");
  const [hunger, setHunger] = useHunger();
  const [thirst, setThirst] = useThirst();
  const [stress, setStress] = useStress();
  const [stamina, setStamina] = useStamina();
  const [armed, setArmed] = useArmed();
  const showVehicle = useShowVehicleValue();
  const engine = useEngineValue();
  const [dev, setDev] = useDev();

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

    setHunger(data.hunger);
    setThirst(data.thirst);
    setStress(data.stress);
    setStamina(data.stamina);
    setArmed(data.armed);
    setDev(data.dev);
  });

  return (
    <>
      {visible && (
        <div className={classes.container}>
          <StatusBar visible={true} value={voice} maxValue={6} color={voiceColor} icon={voiceIcon} />
          <StatusBar visible={true} value={health} color={healthColor} icon={healthIcon} />
          <StatusBar visible={true} value={armour} color={armourColor} icon="fas fa-shield-alt" />
          {(hunger > -1) && (<StatusBar visible={true} value={hunger} color={'#FD7E14'} icon="fas fa-burger" />)}
          {(thirst > -1) && (<StatusBar visible={true} value={thirst} color={'#339AF0'} icon="fas fa-droplet" />)}
          {(stress > -1) && (<StatusBar visible={true} value={stress} color={'#f03e3e'} icon="fas fa-brain" />)}
          <StatusBar visible={true} value={stamina} color="#8aa8bd" icon="fas fa-lungs" />
          <StatusBar visible={armed} value={100} color="#E64980" icon="fas fa-stream" />
          {showVehicle && (<StatusBar visible={true} value={engine} color="#FA5252" icon="fas fa-oil-can" />)}
          <StatusBar visible={dev} value={100} color="#000000" icon="fas fa-terminal" />
        </div>
      )}
    </>
  );
};

export default PlayerHud;