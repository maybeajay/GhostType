// hooks/usePlaySound.ts
import { useRef } from "react";
import { Howl, Howler } from "howler";
import KeyPress from "../assets/sound/keyPress.mp3"; // use .mp3 for best compatibility
import Error from "../assets/sound/error.mp3"

type soundType = {
  sourceSound: "correct" | "incorrect"
}
export default function usePlaySound({sourceSound}: soundType) {
  const soundRef = useRef<Howl | null>(null);
  if (!soundRef.current) {
    soundRef.current = new Howl({
      src: [ sourceSound === "correct"  ?  KeyPress: Error],
      volume: 1.0,
      html5: false,
    });
  }

  function playKeyPress() {
    const ctxState = Howler.ctx?.state;

    if (ctxState === "suspended") {
      Howler.ctx.resume().then(() => {
        console.log("🔁 Resumed AudioContext — playing sound");
        soundRef.current?.play();
      });
    } else {
      soundRef.current?.play();
    }
  }

  return { playKeyPress };
}
