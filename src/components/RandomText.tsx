import { memo, useState, useEffect, type CSSProperties } from "react";
import { useSelector } from "react-redux";
import { useTransition, animated } from "@react-spring/web";

type Props = {
  text: string;
  style?: CSSProperties;
};

const RandomText = ({ text, style }: Props) => {
  const { currentInd, wrongKey } = useSelector((state: any) => state.globalEvents);
  const charArray = text.split("");
  return (
    <div className="flex flex-wrap w-2/3" style={style}>
      {charArray.map((char, index) => (
        <Char
          key={index}
          char={char}
          isActive={index === currentInd}
          showWrongKey={index === currentInd && wrongKey !== null}
          wrongKey={wrongKey}
          isTyped={index < currentInd}
        />
      ))}
    </div>
  );
};

type CharProps = {
  char: string;
  isActive: boolean;
  showWrongKey: boolean;
  wrongKey: string | null;
  isTyped: boolean;
};

const Char = memo(({ char, isActive, showWrongKey, wrongKey, isTyped }: CharProps) => {
  const displayChar = char === " " ? "\u00A0" : char;
  const transitions = useTransition(showWrongKey ? [wrongKey] : [], {
    from: { opacity: 1, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 150, friction: 20 },
  });

  return (
    <span
      style={{
        backgroundColor: isTyped ? "rgba(200, 200, 200, 0.3)" : undefined,
        color: isActive ? "green" : "white",
        fontSize: "1.25rem",
        padding: "0.25rem",
        marginRight: char === " " ? "0.5rem" : 0,
        position: "relative",
        display: "inline-block",
      }}
    >
      {displayChar}
      {transitions((style, item) =>
        item ? (
          <animated.span
            style={{
              ...style,
              position: "absolute",
              top: "-1.5rem",
              left: "0",
              fontSize: "0.8rem",
              color: "red",
              pointerEvents: "none",
            }}
          >
            {item}
          </animated.span>
        ) : null
      )}
    </span>
  );
});

export default RandomText;
