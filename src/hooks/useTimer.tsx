import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const useTimer = (customTimer: number) => {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Only start timer if not already running
        if (intervalRef.current === null && timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev + 1);
            }, 1000);
        }

        if (timer >= customTimer) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            // navigate("/home");
        }

        return () => {
            clearInterval(intervalRef.current!);
        };
    }, [timer, customTimer]);

    // Call this to manually start/reset the timer
    const startTimer = () => {
        if (intervalRef.current === null) {
            setTimer(1); // Start timer at 1 to trigger useEffect
        }
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
    };

    return { timer, setTimer, startTimer, stopTimer };
};
