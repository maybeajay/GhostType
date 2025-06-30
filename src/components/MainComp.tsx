import { useEffect, useState } from "react";
import Header from "./Header";
import RandomText from "./RandomText";
import { BoldText } from "./TextStyles";
import useKeyboardListener from "../hooks/useKeyboardListener";
const MainComp = () => {
  const [text, setText] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum")
  const { handleKeyPress } = useKeyboardListener(text);
  useEffect(() => {
  const listener = (e: KeyboardEvent) => handleKeyPress(e);

  window.addEventListener("keydown", listener);
  return () => {
    window.removeEventListener("keydown", listener);
  };
}, [handleKeyPress]); 
  return (
    <main className="w-full h-screen">
      <Header text="Hello" />
      <div className="w-full h-full bg-slate-900 flex items-center flex-col">
        <BoldText
          style={{
            color: "#fff",
            fontSize: "2em",
            fontWeight: "bolder",
            fontFamily: "Poppins",
          }}
        >
          Test Your Typing Speed and Accuracy in Real-Time
        </BoldText>

        {/* <RegularText style={{color: "#fff", fontSize: 10, fontWeight: 'bolder', fontFamily: "Poppins"}}>
      {apiText}
    </RegularText> */}

        <RandomText
          text={text}
          style={{ fontSize: 20, color: "#fff", margin: "5vh" }}
        />
      </div>
    </main>
  );
};

export default MainComp;
