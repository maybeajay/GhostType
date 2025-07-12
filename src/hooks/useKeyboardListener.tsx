// hooks/useKeyboardListener.ts
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCorrectKey,
  addIncorrectKey,
  addWrongIndex,
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

export default function useKeyboardListener(text: string) {
  // — session storage for user time
  const { retriveFromSession } = useSessionStorage();
  const userTime = retriveFromSession("userTime");
  const { startTimer } = useTimer(Number(userTime) * 60);

  // — redux state
  const currentInd = useSelector((state: any) => state.globalEvents.currentInd);

  // sounds
  const correctSound = usePlaySound({ sourceSound: "correct" });
  const incorrectSound = usePlaySound({ sourceSound: "incorrect" });

  const dispatch = useDispatch();
  const incorrectKeyRef = useRef(0);
  const currentIndRef = useRef(currentInd);
  useEffect(() => {
    currentIndRef.current = currentInd;
  }, [currentInd]);

  // — show “Start Typing” until first a–z press
  const [isVisible, setIsVisible] = useState(true);

  // — main key handler
  function handleKeyPress(event: KeyboardEvent) {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const isMetaKey = isMac ? event.metaKey : event.ctrlKey;
    const forbiddenCombos = ["r", "a", "s", "p"];

    // allow cmd/ctrl+{r,a,s,p} to pass through
    if (isMetaKey && forbiddenCombos.includes(event.key.toLowerCase())) {
      return;
    }

    // block other unwanted keys (F5, Tab, etc.)
    if (keysToPrevent.includes(event.key) || keysToPrevent.includes(event.code)) {
      event.preventDefault();
    }

    let key = event.key;
    const isShift = event.shiftKey;
    const isEnter = key === ENTER;
    const isBackSpace = key === BACKSPACE;
    const isSpaceBar = event.code === SPACEBAR;

    if (keysToIgnore.includes(key)) return;
    if (isSpaceBar && currentIndRef.current === 0) return;

    const expectedChar = text[currentIndRef.current];
    let typedChar = "";

    // start the timer on first letter
    if (/^[a-z]$/i.test(key)) {
      startTimer();
      setIsVisible(false);
    }

    // normalize typedChar
    if (/^[a-z]$/i.test(key)) {
      typedChar = isShift ? key.toUpperCase() : key.toLowerCase();
    } else if (isSpaceBar) {
      typedChar = " ";
    } else if (isEnter) {
      typedChar = "\n";
    } else if (isBackSpace) {
      // move back to start-of-word, and reset wrong-key allowance
      const lastSpace = text.lastIndexOf(" ", currentIndRef.current - 1);
      const minIdx = lastSpace + 1;
      if (currentIndRef.current > minIdx) {
        dispatch(setCurrentIndex(Math.max(minIdx, currentIndRef.current - 1)));
        incorrectKeyRef.current = 0;
      }
      return;
    } else {
      // other keys we don’t handle
      return;
    }

    dispatch(setcurrKeyPress(typedChar));

    // correct key
    if (typedChar === expectedChar) {
      dispatch(setCurrentIndex(currentIndRef.current + 1));
      dispatch(setWrongKey(null));
      dispatch(addCorrectKey(typedChar));
      incorrectKeyRef.current = 0;
      correctSound.playKeyPress();

    // first wrong key in this word
    } else if (incorrectKeyRef.current === 0) {
      incorrectKeyRef.current++;
      dispatch(setCurrentIndex(currentIndRef.current + 1));
      dispatch(setincorrectKeyPress(1));
      dispatch(setWrongKey(typedChar));
      dispatch(addIncorrectKey(typedChar));
      dispatch(addWrongIndex(currentIndRef.current));
      incorrectSound.playKeyPress();

    // subsequent wrong keys in same word (we still play sound & record)
    } else {
      dispatch(setWrongKey(typedChar));
      dispatch(addIncorrectKey(typedChar));
      // note: we don’t re-add the same index
      incorrectSound.playKeyPress();
    }
  }

  return { handleKeyPress, isVisible };
}
