import { memo } from "react";

type CharProps = {
  char: string;
  index: number;
  currentInd: number;
  wrongKey: string | null;
  wrongIndexes: number[];
};

const Char = memo(
  ({ char, index, currentInd, wrongKey, wrongIndexes }: CharProps) => {
    const displayChar = char === " " ? "\u00A0" : char;

    const isActive = index === currentInd;
    const isTyped = index < currentInd;
    const wasWronglyTyped = wrongIndexes.includes(index);
    const showWrongKey = isActive && !!wrongKey;

    return (
      <span
        style={{
          backgroundColor: showWrongKey
            ? "#E85D75"
            : wasWronglyTyped
            ? "#F9B5AC"
            : isTyped
            ? "#C4CBCA"
            : undefined,
          color: isActive ? "#419D78" : "black",
          fontSize: "2.25rem",
          padding: "0.25rem",
          marginRight: char === " " ? "0.5rem" : 0,
          position: "relative",
          display: "inline-block",
          transition: "background-color 0.15s ease",
        }}
      >
        {displayChar}

        {showWrongKey && (
          <span key={wrongKey} className="wrong-key">
            {wrongKey}
          </span>
        )}
      </span>
    );
  }
);

export default Char;
