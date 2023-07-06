import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const Store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// "RootState" & "AppDispatch" types from the store itself
export default Store;
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
