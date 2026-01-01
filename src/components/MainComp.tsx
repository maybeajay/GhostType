import { useEffect } from "react";
import Header from "./Header";
import RandomText from "./RandomText";
import { BoldText } from "./TextStyles";
import useKeyboardListener from "../hooks/useKeyboardListener";
const MainComp = () => {
  const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
  const { handleKeyPress, isVisible } = useKeyboardListener(text);
  useEffect(() => {
  const listener = (e: KeyboardEvent) => handleKeyPress(e);

  window.addEventListener("keydown", listener);
  return () => {
    window.removeEventListener("keydown", listener);
  };
}, [handleKeyPress]); 
  return (
    <main className="w-full h-screen items-center flex flex-col">
      <Header  />
      <div className="w-full h-full  flex items-center flex-col justify-center select-none">
        <BoldText
          style={{
            color: "#110B11",
            fontSize: "2.5em",
            fontWeight: "bolder",
          }}
        >
          Test Your Typing Speed and Accuracy in Real-Time
        </BoldText>

        {/* <CircularTimer duration={10}/> */}
        <RandomText
          text={text}
          style={{ fontSize: 20, color: "#fff", margin: "5vh" }}
          isVisible={isVisible}
        />
      </div>
    </main>
  );
};

export default MainComp;
