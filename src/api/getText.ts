import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const generateRandomText = async (paragraph: number) => {
    try {
        const headers = {
            'X-Api-Key': API_KEY
        };
        const response = await axios.get(`${API_URL}?paragraphs=${paragraph}`, { headers });
        return response;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};
