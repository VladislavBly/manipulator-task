import { configureStore } from "@reduxjs/toolkit";
import gridReducer from "./gridSlice";
import activeGridReducer from "./activeGridSlice";
import itemReducer from "./ItemSlice";

const store = configureStore({
    reducer: {
        grid: gridReducer,
        activeGrid: activeGridReducer,
        items: itemReducer,
    },
})



export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch