import {
  memo,
  useState,
  useEffect,
  type CSSProperties,
} from "react";
import { useSelector } from "react-redux";
import { useTransition, animated } from "@react-spring/web";
import StartTyping from "./StartTyping";

type Props = {
  text: string;
  style?: CSSProperties;
  isVisible: boolean;
};

const RandomText = ({ text, style, isVisible }: Props) => {
  const { currentInd, wrongKey, wrongIndexes } = useSelector(
    (state: any) => state.globalEvents
  );

  const fullCharArray = text.split("");
  const [visibleCharCount, setVisibleCharCount] = useState(150);

  useEffect(() => {
    if (
      currentInd >= visibleCharCount - 30 &&
      visibleCharCount < fullCharArray.length
    ) {
      setVisibleCharCount((prev) => Math.min(prev + 100, fullCharArray.length));
    }
  }, [currentInd, visibleCharCount, fullCharArray.length]);

  const visibleCharArray = fullCharArray.slice(0, visibleCharCount);

  const transitions = useTransition(visibleCharArray, {
    keys: (_, i) => i,
    from: { opacity: 0, transform: "translateY(10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 170, friction: 18 },
  });

  return (
    <>
      <div className="flex flex-wrap relative w-2/3 p-6" style={style}>
        {isVisible ? <StartTyping /> : null}
        {transitions((style, char, _, index) => (
          <animated.span style={style} key={index}>
            <Char
              char={char}
              isActive={index === currentInd}
              showWrongKey={wrongIndexes.includes(index)}
              wrongKey={wrongKey}
              isTyped={index < currentInd}
              currentInd={currentInd}
            />
          </animated.span>
        ))}
      </div>
    </>
  );
};

type CharProps = {
  char: string;
  isActive: boolean;
  showWrongKey: boolean;
  wrongKey: string | null;
  isTyped: boolean;
  currentInd: number;
};

const Char = memo(
  ({
    char,
    isActive,
    showWrongKey,
    wrongKey,
    isTyped,
  }: CharProps) => {
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
          backgroundColor: showWrongKey && displayChar !== "\u00A0"
            ? "#E85D75"
            : isTyped
            ? "#C4CBCA"
            : undefined,
          color: isActive ? "#419D78" : "black",
          fontSize: "2.25rem",
          padding: "0.25rem",
          marginRight: char === " " ? "0.5rem" : 0,
          position: "relative",
          display: "inline-block",
          transition: "background-color 0.2s ease",
        }}
      >
      
        {displayChar}
        {transitions((style, item) =>
          item ? (
            <animated.span
              style={{
                ...style,
                position: "absolute",
                top: "-2.5rem",
                left: "-1rem",
                fontSize: "1.9rem",
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
  }
);

export default RandomText;
