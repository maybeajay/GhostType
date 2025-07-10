import { useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { useNavigate } from "react-router";
import Modal from "../components/Modal"; // Make sure path is correct

export default function WelcomeScreen() {
  const [duration, setDuration] = useState("1");
  const { saveToSession } = useSessionStorage();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleStartSession() {
    saveToSession(duration, "userTime");
    setShowModal(true);
  }

  function handleModalComplete() {
    navigate("/typing-test");
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f0fdf9] px-4 text-center relative">
      {showModal && <Modal onComplete={handleModalComplete} />}

      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#419D78] drop-shadow">
          Ready, Set, Type!
        </h1>

        <p className="text-gray-700 text-lg sm:text-xl font-medium">
          Challenge your speed and accuracy with our focused typing test.
          Choose your time, hit start, and watch your words fly across the screen.
        </p>

        <p className="text-gray-500 text-base sm:text-lg">
          Improve your skills with every session. We’ll track your Words Per Minute, Accuracy, and more.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 focus:ring-[#419D78] focus:border-[#419D78] shadow-sm outline-none"
          >
            <option value="1">1 Minute</option>
            <option value="3">3 Minutes</option>
            <option value="5">5 Minutes</option>
          </select>

          <button
            onClick={handleStartSession}
            className="bg-[#419D78] hover:bg-[#367e61] text-white font-semibold px-6 py-2 rounded-md shadow-md transition duration-200"
          >
            Start Typing Test
          </button>
        </div>
      </div>
    </div>
  );
}
