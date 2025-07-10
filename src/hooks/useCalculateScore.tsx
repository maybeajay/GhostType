export default function useCalculateScore() {
  function calculateTypingStats({
    correctCharCount,
    totalTypedChars,
    uncorrectedErrors,
    timeInSeconds,
  }: {
    correctCharCount: number;
    totalTypedChars: number;
    uncorrectedErrors: number;
    timeInSeconds: number;
  }) {
    const timeInMinutes = timeInSeconds / 10;

    const wpm = correctCharCount / 5 / timeInMinutes;
    const accuracy = (correctCharCount / totalTypedChars) * 100;
    const netWpm = wpm - uncorrectedErrors / timeInMinutes;

    return {
      wpm: Math.floor(Math.max(0, wpm)),
      netWpm: Math.floor(Math.max(0, netWpm)),
      accuracy: Math.max(0, accuracy),
    };
  }
  return {calculateTypingStats}
}
