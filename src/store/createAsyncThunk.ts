// store/thunks/fetchRandomText.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateRandomText } from "../api/getText";

export const fetchRandomText = createAsyncThunk<
  string,
  number,
  { rejectValue: string }
>(
  "text/fetchRandomText",
  async (paragraphs, { rejectWithValue }) => {
    try {
      const data = await generateRandomText(paragraphs);
      return data.text;
    } catch (error) {
      return rejectWithValue("Failed to fetch random text");
    }
  }
);
