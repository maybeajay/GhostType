import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface GlobalEventsState {
  currKeyPress: string;
  wrongKey: string | null;
  currentInd: number;
  correctKeyPress: number;
  incorrectKeyPress: number;
  correctKeys: string[]; 
  incorrectKeys: string[];
  wrongIndexes: number[],
}

const initialState: GlobalEventsState = {
  currKeyPress: "",
  wrongKey: null,
  currentInd: 0,
  correctKeyPress: 0,
  incorrectKeyPress: 0,
  correctKeys: [],
  incorrectKeys: [],
  wrongIndexes: [] ,

};

const globalEventsSlice = createSlice({
  name: "globalEvents",
  initialState,
  reducers: {
    clearEvents(state) {
      state.currKeyPress = "";
      state.wrongKey = null;
      state.currentInd = 0;
      state.correctKeyPress = 0;
      state.incorrectKeyPress = 0;
      state.correctKeys = [];  
      state.incorrectKeys = [];
      state.wrongIndexes= [];
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
    addCorrectKey(state, action: PayloadAction<string>) {
      state.correctKeys.push(action.payload);
    },
    addIncorrectKey(state, action: PayloadAction<string>) {
      state.incorrectKeys.push(action.payload);
    },
  addWrongIndex: (state, action: PayloadAction<number>) => {
  state.wrongIndexes.push(action.payload);
}

  },
});

export const {
  setCurrentIndex,
  clearEvents,
  setcurrKeyPress,
  setcorrectKeyPress,
  setincorrectKeyPress,
  setWrongKey,
  addCorrectKey,      
  addIncorrectKey, 
  addWrongIndex  
} = globalEventsSlice.actions;

export default globalEventsSlice.reducer;
