// hooks/useUnlockAudioContext.ts
import { useEffect } from "react";
import { Howler } from "howler";

export default function useUnlockAudioContext() {
  // need to initalize this hook so i can play multiple key press sound smoothly on web 
  // a GPT funciton (but will read it and implement later by myself)
  useEffect(() => {
    const unlock = () => {
      if (Howler.ctx?.state === "suspended") {
        Howler.ctx.resume().then(() => {
          console.log("🔓 AudioContext resumed");
        });
      }

      document.removeEventListener("click", unlock);
      document.removeEventListener("keydown", unlock);
    };

    document.addEventListener("click", unlock);
    document.addEventListener("keydown", unlock);

    return () => {
      document.removeEventListener("click", unlock);
      document.removeEventListener("keydown", unlock);
    };
  }, []);
}
