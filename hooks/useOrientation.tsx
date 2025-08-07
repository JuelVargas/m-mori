import { ORIENTATION_NUMBER } from "@/utils/orientation";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";

const useOrientation = (): String | null => {
  const [screenOrientation, setScreenOrientation] = useState< String | Number>('PORTRAIT');

  useEffect(() => {
    const onOrientationChange = (event: ScreenOrientation.OrientationChangeEvent) => {
      const orientationValue = event.orientationInfo.orientation;
      setScreenOrientation(orientationValue);
    };

    const initScreenOrientation = async () => {
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      setScreenOrientation(currentOrientation);
    };
    initScreenOrientation();

    const subscription = ScreenOrientation.addOrientationChangeListener(onOrientationChange);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);
// @ts-ignore
  return ORIENTATION_NUMBER[screenOrientation];
};

export default useOrientation;
