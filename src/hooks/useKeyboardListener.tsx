import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCorrectKey,
  addIncorrectKey,
  setCurrentIndex,
  setcurrKeyPress,
  setincorrectKeyPress,
  setWrongKey,
} from "../slice/globalReducer";
import { useTimer } from "./useTimer";
import {
  BACKSPACE,
  ENTER,
  keysToIgnore,
  keysToPrevent,
  SPACEBAR,
} from "../constants/AppConstants";
import usePlaySound from "./usePlaySound";
import useSessionStorage from "./useSessionStorage";

// Pass the full source text to validate against
export default function useKeyboardListener(text: string) {
  const {retriveFromSession} = useSessionStorage();
  let userTime = retriveFromSession('userTime');

  // timer * 60 
  const { startTimer } = useTimer(Number(userTime * 60));
  const currentInd = useSelector((state: any) => state.globalEvents.currentInd);
  const correctSound = usePlaySound({ sourceSound: "correct" });
  const incorrectSound = usePlaySound({ sourceSound: "incorrect" });
  const dispatch = useDispatch();
  const incorrectKeyRef = useRef<number>(0);
  const [isVisible, setisVisible]=useState<boolean>(true);

  const currentIndRef = useRef(currentInd);

  useEffect(() => {
    currentIndRef.current = currentInd;
  }, [currentInd]);

  function handleKeyPress(event: KeyboardEvent) {
  const isMac = navigator.platform.toUpperCase().includes("MAC");
  const isMetaKey = isMac ? event.metaKey : event.ctrlKey;
  const forbiddenCombos = ["r", "a", "s", "p"];

  // Exit early: allow browser behavior, but skip our logic
  if (isMetaKey && forbiddenCombos.includes(event.key.toLowerCase())) {
    return;
  }

  //  Prevent unwanted keys like F5, Tab, etc. only on our web app level

  if (
    keysToPrevent.includes(event.key) ||
    keysToPrevent.includes(event.code)
  ) {
    event.preventDefault();
  }

  // Rest of your logic...
  let key = event.key;
  const isShift = event.shiftKey;
  const isEnter = key === ENTER;
  const isBackSpace = key === BACKSPACE;
  const isSpaceBar = event.code === SPACEBAR;

  if (keysToIgnore.includes(key)) return;
  if (isSpaceBar && currentIndRef.current === 0) return;

  const expectedChar = text[currentIndRef.current];

  let typedChar = "";
  if((/^[a-z]$/i.test(key))){
    startTimer();
    setisVisible(false)
  }

  if (/^[a-z]$/i.test(key)) {
    typedChar = isShift ? key.toUpperCase() : key.toLowerCase();
  } else if (isSpaceBar) {
    typedChar = " ";
  } else if (isEnter) {
    typedChar = "\n";
  } else if (isBackSpace) {
    const lastSpaceIndex = text.lastIndexOf(" ", currentIndRef.current - 1);
    const minAllowedIndex = lastSpaceIndex + 1;

    if (currentIndRef.current > minAllowedIndex) {
      dispatch(setCurrentIndex(Math.max(minAllowedIndex, currentIndRef.current - 1)));
      incorrectKeyRef.current = 0;
    }
    return;
  } else {
    return;
  }

  dispatch(setcurrKeyPress(typedChar));

  if (typedChar === expectedChar) {
  dispatch(setCurrentIndex(currentIndRef.current + 1));
  dispatch(setWrongKey(null));
  dispatch(addCorrectKey(typedChar));
  incorrectKeyRef.current = 0;
  correctSound.playKeyPress();
} else if (incorrectKeyRef.current === 0) {
  incorrectKeyRef.current++;
  dispatch(setCurrentIndex(currentIndRef.current + 1));
  dispatch(setincorrectKeyPress(1));
  dispatch(setWrongKey(typedChar));
  dispatch(addIncorrectKey(typedChar));
  incorrectSound.playKeyPress();
} else {
  dispatch(setWrongKey(typedChar));
  dispatch(addIncorrectKey(typedChar));
  incorrectSound.playKeyPress();
}
}


  return { handleKeyPress, isVisible };
}
