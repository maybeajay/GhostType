import { useEffect, useState } from "react"
import { generateRandomText } from "../api/getText";

const useRandomText = () => {
    const [apiText, setApiText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchText = async () => {
            setIsLoading(true);
            try {
                const res = await generateRandomText(2);
                console.log("res", res);
                setApiText(res?.data?.text || null);
            } catch (err) {
                console.error("Failed to fetch text", err);
                setApiText(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchText();
    }, []);

    return { apiText, isLoading };
};

export { useRandomText };
