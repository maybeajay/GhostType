import { useEffect, useState } from "react";
import { generateRandomText } from "../api/getText";

const useRandomText = () => {
  const [apiText, setApiText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchText = async () => {
    setIsLoading(true);
    try {
      const res = await generateRandomText(3);
      setApiText(res?.text || "");
    } catch (err) {
      console.error("Failed to fetch text", err);
      setApiText(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchText();
  }, []);

  return { apiText, isLoading };
};

export { useRandomText };
