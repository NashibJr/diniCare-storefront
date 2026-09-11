import { combineReducers, configureStore } from "@reduxjs/toolkit";
import localStorage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

type RootState_ = {};

const persistConfig = {
  key: "root",
  storage: localStorage,
} as PersistConfig<RootState_>;

const combinedReducer = combineReducers({});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
