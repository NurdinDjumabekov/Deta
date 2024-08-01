import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenA: "",
};

const saveDataSlice = createSlice({
  name: "saveDataSlice",
  initialState,
  reducers: {
    changeTokenA: (state, action) => {
      state.tokenA = action.payload;
    },
  },
});
export const { changeTokenA } = saveDataSlice.actions;

export default saveDataSlice.reducer;
