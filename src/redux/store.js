import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {    //dummy storage if te script is not running in a browser environment i.e typeof window === 'undefined'
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined"  //This can be used to detect whether code is running in a typical browser environment (e.g. an environment with a browser DOM) or in some other JS environment since the window object exists in a typical browser JS,
// but does not exist in something like node.js or even a webWorker in a browser.
 ? createWebStorage("local") : createNoopStorage();


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const storeSlice = configureStore({
  reducer: {cart:persistedReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  
})

export let persistor = persistStore(storeSlice)

