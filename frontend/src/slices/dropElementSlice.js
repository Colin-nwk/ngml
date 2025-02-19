import { createSlice } from "@reduxjs/toolkit";

const dropElementsSlice = createSlice({
  name: "elements",
  initialState: [],
  reducers: {
    addElement: (state, action) => {
      state.push(action.payload);
    },
    removeElement: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    replaceElement: (state, action) => {
      const element = state[action.payload.index];
      if (element) {
        element.itemName = action.payload.itemName;
      }
    },
  },
});

export const { addElement, removeElement, replaceElement } =
  dropElementsSlice.actions;
export default dropElementsSlice.reducer;
