import { useEffect, useMemo, useState } from "react";

const CircularTimer = ({ duration = 60 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const colorCodes = {
    safe: "#00916E",
    mid: "#FFCF00",
    danger: "#FA003F"
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = timeLeft / duration;
  const strokeDashoffset = circumference * (1 - progress);

//   so that does not re render un necessarily 
  const strokeColor = useMemo(() => {
  const percent = (timeLeft / duration) * 100;

  return percent <= 15
    ? colorCodes.danger
    : percent <= 50
    ? colorCodes.mid
    : colorCodes.safe;
}, [timeLeft, duration]);

  return (
    <div className="flex items-center justify-center h-40 w-40">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e5e5"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={strokeColor} 
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#111827"
          fontSize="24"
          fontWeight="bold"
        >
          {timeLeft}
        </text>
        <text
          x="50%"
          y="80%"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="12"
        >
          seconds
        </text>
      </svg>
    </div>
  );
};

export default CircularTimer;
