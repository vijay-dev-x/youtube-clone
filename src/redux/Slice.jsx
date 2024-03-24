import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: true,
  catagory: "popular in india",
  vidio: [],
  Suggestion: [],
  channelLogo: "null",
};
export const Slice = createSlice({
  name: "showHide",
  initialState,
  reducers: {
    toggleAction: (state) => {
      state.open = !state.open;
    },
    setCatagory: (state, action) => {
      state.catagory = action.payload;
    },
    setVidio: (state, action) => {
      state.vidio = action.payload;
    },
    setSuggestion: (state, action) => {
      state.Suggestion = action.payload;
    },
    setChannelLogo: (state, action) => {
      state.channelLogo = action.payload;
    },
  },
});
export const {
  toggleAction,
  setCatagory,
  setVidio,
  setSuggestion,
  setChannelLogo,
} = Slice.actions;
export default Slice.reducer;
