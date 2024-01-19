import { authReducer } from './authSlice';
import { configureStore } from "@reduxjs/toolkit";
import { flightReducer } from "./flightSlice";
export const store = configureStore({
    reducer: {
        flights: flightReducer,
        auth: authReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

