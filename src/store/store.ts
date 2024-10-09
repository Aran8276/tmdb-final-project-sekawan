import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "./reducers/homeReducer";
import { listReducer } from "./reducers/listReducer";

const state = configureStore({
  reducer: {
    home: homeReducer,
    list: listReducer,
  },
});

export default state;
