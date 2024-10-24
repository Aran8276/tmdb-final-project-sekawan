import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "./reducers/homeReducer";
import { listReducer } from "./reducers/listReducer";
import { genreReducer } from "./reducers/genreReducer";
import { detailReducer } from "./reducers/detailReducer";
import { linkReducer } from "./reducers/linkReducer";

const state = configureStore({
  reducer: {
    home: homeReducer,
    list: listReducer,
    genre: genreReducer,
    detail: detailReducer,
    link: linkReducer,
  },
});

export default state;
