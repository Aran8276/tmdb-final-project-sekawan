import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "./reducers/homeReducer";

const state = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export default state;
