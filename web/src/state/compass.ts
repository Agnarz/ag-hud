import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const showCompass = atom<boolean>(false);
export const useShowCompass = () => useAtom(showCompass);
export const useShowCompassValue = () => useAtomValue(showCompass);
export const useSetShowCompass = () => useSetAtom(showCompass);

const crossroads = atom<string[]>(['', '']);
export const useCrossroads = () => useAtom(crossroads);
export const useCrossroadsValue = () => useAtomValue(crossroads);
export const useSetCrossroads = () => useSetAtom(crossroads);

const heading = atom<string>('');
export const useHeading = () => useAtom(heading);
export const useHeadingValue = () => useAtomValue(heading);
export const useSetHeading = () => useSetAtom(heading);

const zone = atom<string>('');
export const useZone = () => useAtom(zone);
export const useZoneValue = () => useAtomValue(zone);
export const useSetZone = () => useSetAtom(zone);