import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const showVehicle = atom<boolean>(false);
export const useShowVehicle = () => useAtom(showVehicle);
export const useShowVehicleValue = () => useAtomValue(showVehicle);
export const useSetShowVehicle = () => useSetAtom(showVehicle);

const speed = atom<number>(0);
export const useSpeed = () => useAtom(speed);
export const useSpeedValue = () => useAtomValue(speed);
export const useSetSpeed = () => useSetAtom(speed);

const maxSpeed = atom<number>(0);
export const useMaxSpeed = () => useAtom(maxSpeed);
export const useMaxSpeedValue = () => useAtomValue(maxSpeed);
export const useSetMaxSpeed = () => useSetAtom(maxSpeed);

const rpm = atom<number>(0);
export const useRpm = () => useAtom(rpm);
export const useRpmValue = () => useAtomValue(rpm);
export const useSetRpm = () => useSetAtom(rpm);

const gear = atom<number>(0);
export const useGear = () => useAtom(gear);
export const useGearValue = () => useAtomValue(gear);
export const useSetGear = () => useSetAtom(gear);

const fuel = atom<number>(0);
export const useFuel = () => useAtom(fuel);
export const useFuelValue = () => useAtomValue(fuel);
export const useSetFuel = () => useSetAtom(fuel);

const engine = atom<number>(0);
export const useEngine = () => useAtom(engine);
export const useEngineValue = () => useAtomValue(engine);
export const useSetEngine = () => useSetAtom(engine);

const seatbelt = atom<boolean>(false);
export const useSeatbelt = () => useAtom(seatbelt);
export const useSeatbeltValue = () => useAtomValue(seatbelt);
export const useSetSeatbelt = () => useSetAtom(seatbelt);

const locked = atom<boolean>(false);
export const useLocked = () => useAtom(locked);
export const useLockedValue = () => useAtomValue(locked);
export const useSetLocked = () => useSetAtom(locked);

