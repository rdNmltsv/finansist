import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { ratesAPI } from "../services/CurrencyService";

export const store = configureStore({
  reducer: {
    [ratesAPI.reducerPath]: ratesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ratesAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
