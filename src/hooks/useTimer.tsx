import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const useTimer = (customTimer: number) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          const next = prev + 1;
          if (next >= customTimer) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            navigate("/results");
          }
          return next;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    
    return () => {
      stopTimer();
    };
  }, []);

  return { timer, setTimer, startTimer, stopTimer };
};
