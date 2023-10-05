import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const showPlayer = atom<boolean>(false);
export const useShowPlayer = () => useAtom(showPlayer);
export const useShowPlayerValue = () => useAtomValue(showPlayer);
export const useSetShowPlayer = () => useSetAtom(showPlayer);

const voice = atom<number>(0);
export const useVoice = () => useAtom(voice);
export const useVoiceValue = () => useAtomValue(voice);
export const useSetVoice = () => useSetAtom(voice);

const health = atom<number>(0);
export const useHealth = () => useAtom(health);
export const useHealthValue = () => useAtomValue(health);
export const useSetHealth = () => useSetAtom(health);

const armour = atom<number>(0);
export const useArmour = () => useAtom(armour);
export const useArmourValue = () => useAtomValue(armour);
export const useSetArmour = () => useSetAtom(armour);

const hunger = atom<number>(0);
export const useHunger = () => useAtom(hunger);
export const useHungerValue = () => useAtomValue(hunger);
export const useSetHunger = () => useSetAtom(hunger);

const thirst = atom<number>(0);
export const useThirst = () => useAtom(thirst);
export const useThirstValue = () => useAtomValue(thirst);
export const useSetThirst = () => useSetAtom(thirst);

const stress = atom<number>(0);
export const useStress = () => useAtom(stress);
export const useStressValue = () => useAtomValue(stress);
export const useSetStress = () => useSetAtom(stress);

const stamina = atom<number>(0);
export const useStamina = () => useAtom(stamina);
export const useStaminaValue = () => useAtomValue(stamina);
export const useSetStamina = () => useSetAtom(stamina);

const armed = atom<boolean>(false);
export const useArmed = () => useAtom(armed);
export const useArmedValue = () => useAtomValue(armed);
export const useSetArmed = () => useSetAtom(armed);

const dev = atom<boolean>(false);
export const useDev = () => useAtom(dev);
export const useDevValue = () => useAtomValue(dev);
export const useSetDev = () => useSetAtom(dev);
