import { useEffect } from "react";
import Header from "./Header";
import RandomText from "./RandomText";
import { BoldText } from "./TextStyles";
import useKeyboardListener from "../hooks/useKeyboardListener";
import { useRandomText } from "../hooks/useRandomText";
import SkeletonLoader from "./SkeletonLoad";
const MainComp = () => {
  const { apiText, isLoading } = useRandomText();  
  const { handleKeyPress, isVisible } = useKeyboardListener(apiText ?? "");
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
       {
        isLoading ? <SkeletonLoader />:  <RandomText
          text={apiText ?? ""}
          style={{ fontSize: 20, color: "#fff", margin: "5vh" }}
          isVisible={isVisible}
        />
       }
      </div>
    </main>
  );
};

export default MainComp;
