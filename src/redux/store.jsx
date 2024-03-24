import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";
import chatSlice from "./chatSlice";
export const store = configureStore({
  reducer: {
    app: Slice,
    chat: chatSlice,
  },
});
