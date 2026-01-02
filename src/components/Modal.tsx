import { useEffect, useState } from "react";

type ModalProps = {
  onComplete: () => void;
};

export default function Modal({ onComplete }: ModalProps) {
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    const interval = setInterval(() => {
      setTimer((prev)=>prev-1);
    }, 1000);

    if(Number(timer) === 0){
      clearInterval(interval);
    }

    return () => {clearTimeout(timer);

      clearInterval(interval)
    }
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#419D78]">Get Ready...</h2>
        <p className="text-gray-600">Your test will begin shortly!</p>
        <div className="animate-pulse mt-4 text-[#419D78] font-medium">
          Starting in {timer} seconds...
        </div>
      </div>
    </div>
  );
}
