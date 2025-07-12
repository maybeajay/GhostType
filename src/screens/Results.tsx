import { useDispatch, useSelector } from "react-redux";
import useCalculateScore from "../hooks/useCalculateScore";
import { useEffect, useState } from "react";
import { clearEvents } from "../slice/globalReducer";
import useSessionStorage from "../hooks/useSessionStorage";
import { useNavigate } from "react-router";

const Results = () => {
  const { correctKeys, incorrectKeys } = useSelector((state: any) => state.globalEvents);
  const dispatch = useDispatch();
  const [userStats, setUserStats] = useState<any>(null);
  const { calculateTypingStats } = useCalculateScore();
  const { retriveFromSession, removeItem } = useSessionStorage();
  const navigate = useNavigate();

  const userTime = retriveFromSession("userTime");

  const parsedTime = userTime !== null ?  parseInt(userTime) : 0;

  useEffect(() => {
    if(!parsedTime){
      navigate('/', {replace: true})
    }

    const stats = calculateTypingStats({
      correctCharCount: correctKeys.length,
      totalTypedChars: correctKeys.length + incorrectKeys.length,
      uncorrectedErrors: incorrectKeys.length,
      timeInSeconds: parsedTime
    });

    setUserStats(stats);

    const timer = setTimeout(() => {
      dispatch(clearEvents());
      removeItem("userTime");
      
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  function handleRetakeTest() {
    navigate("/");
  }

  function handleGoHome() {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f0fdf9] px-4 text-center">
      <div className="max-w-2xl w-full space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#419D78] drop-shadow mb-4">
          🎉 Great Job!
        </h1>

        <p className="text-gray-700 text-lg sm:text-xl font-medium">
          Here's how you did in your typing test:
        </p>

        {userStats ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl shadow-lg py-6 px-4 border border-gray-200">
              <h2 className="text-2xl font-semibold text-[#419D78]">
                {userStats.wpm.toFixed(2)}
              </h2>
              <p className="text-gray-600 text-sm mt-1">Words Per Minute</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg py-6 px-4 border border-gray-200">
              <h2 className="text-2xl font-semibold text-[#419D78]">
                {userStats.netWpm.toFixed(2)}
              </h2>
              <p className="text-gray-600 text-sm mt-1">Net WPM (w/o errors)</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg py-6 px-4 border border-gray-200">
              <h2 className="text-2xl font-semibold text-[#419D78]">
                {userStats.accuracy.toFixed(2)}%
              </h2>
              <p className="text-gray-600 text-sm mt-1">Accuracy</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-8 text-lg">Calculating stats...</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
          <button
            onClick={handleRetakeTest}
            className="bg-[#419D78] hover:bg-[#367e61] text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-200"
          >
            🔁 Retake Test
          </button>
          <button
            onClick={handleGoHome}
            className="bg-white hover:bg-gray-100 text-[#419D78] font-semibold px-6 py-3 rounded-md border border-[#419D78] shadow-sm transition duration-200"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
