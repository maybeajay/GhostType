import { createSlice } from "@reduxjs/toolkit";
import { fetchRandomText } from "../store/createAsyncThunk";

interface TextState {
  text: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TextState = {
  text: null,
  loading: false,
  error: null,
};

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    clearText(state:any) {
      state.text = null;
    },
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(fetchRandomText.pending, (state:any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomText.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.text = action.payload;
      })
      .addCase(fetchRandomText.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});
export default textSlice.reducer;