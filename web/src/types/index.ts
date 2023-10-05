export interface StatusBarProps {
  visible: boolean;
  value: number;
  maxValue?: number;
  color: string;
  icon: string;
  ratio?: number;
  strokeWidth?: number;
  size?: number;
}

export interface PlayerHudProps {
  show: boolean;
  voice: number;
  talking: boolean;
  health: number;
  isDead: boolean;
  armour: number;
  hunger: number;
  thirst: number;
  stress: number;
  stamina: number;
  armed: boolean;
  dev: boolean;
};

export interface VehicleHudProps {
  show: boolean;
  speed: number;
  maxSpeed: number;
  rpm: number;
  gear: number;
  fuel: number;
  seatbelt: boolean;
  locked: boolean;
};

export interface CompassProps {
  show: boolean;
  crossroads: any[];
  heading: string;
  zone: string;
};
