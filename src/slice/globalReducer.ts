import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface GlobalEventsState {
  currKeyPress: string;
  wrongKey: string | null;
  currentInd: number;
  correctKeyPress: number;
  incorrectKeyPress: number;
}

const initialState: GlobalEventsState = {
  currKeyPress: "",
  wrongKey: null,
  currentInd: 0,
  correctKeyPress: 0,
  incorrectKeyPress: 0,
};

const globalEventsSlice = createSlice({
  name: "globalEvents",
  initialState,
  reducers: {
    clearEvents(state) {
      state.currKeyPress = "";
      state.currentInd = 0;
    },
    setcurrKeyPress(state, action: PayloadAction<string>) {
      state.currKeyPress = action.payload;
    },
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentInd = action.payload;
    },
    setcorrectKeyPress(state, action: PayloadAction<number>) {
      state.correctKeyPress = action.payload;
    },
    setincorrectKeyPress(state, action: PayloadAction<number>) {
      state.incorrectKeyPress = action.payload;
    },
    setWrongKey(state, action: PayloadAction<string | null>) {
      state.wrongKey = action.payload;
    },
  },
});

export const {
  setCurrentIndex,
  clearEvents,
  setcurrKeyPress,
  setcorrectKeyPress,
  setincorrectKeyPress,
  setWrongKey,
} = globalEventsSlice.actions;
export default globalEventsSlice.reducer;
