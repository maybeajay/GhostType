import { memo } from "react";
import { RegularText } from "./TextStyles";

const StartTyping = memo(() => {
  return (
    <div className="absolute top-[-10px]  animate-bounce">
      <div className="bg-[#1EA896] text-white text-sm font-medium rounded px-4 py-2 text-center">
        <RegularText>Start Typing!</RegularText>
      </div>
      <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-0 h-0 
                      border-l-8 border-r-8 border-t-8 
                      border-l-transparent border-r-transparent border-t-[#1EA896]">
      </div>
    </div>
  );
});


export default StartTyping;
