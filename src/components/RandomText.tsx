import {  useEffect, useState, type CSSProperties } from "react";
import { useSelector } from "react-redux";
import StartTyping from "./StartTyping";
import Char from "./RenderChar";

type Props = {
  text: string;
  style?: CSSProperties;
  isVisible: boolean;
};

const RandomText = ({ text, style, isVisible }: Props) => {
  const { currentInd, wrongKey, wrongIndexes } = useSelector(
    (state: any) => state.globalEvents
  );

  const chars = text.split("");
  const [visibleCharCount, setVisibleCharCount] = useState(150);

  useEffect(() => {
    if (currentInd >= visibleCharCount - 30) {
      setVisibleCharCount((p) =>
        Math.min(p + 100, chars.length)
      );
    }
  }, [currentInd, chars.length]);

  return (
    <div className="flex flex-wrap relative w-2/3 p-6" style={style}>
      {isVisible && <StartTyping />}

      {chars.slice(0, visibleCharCount).map((char, index) => (
        <span key={index} className="char-enter">
          <Char
            char={char}
            index={index}
            currentInd={currentInd}
            wrongKey={wrongKey}
            wrongIndexes={wrongIndexes}
          />
        </span>
      ))}
    </div>
  );
};

export default RandomText;
