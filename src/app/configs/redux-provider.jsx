"use client";

import { Provider } from "react-redux";
import { storeSlice } from "@/redux/store";
import { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider({ children }) {
  return (
    <Provider store={storeSlice}>
      <PersistGate persistor={persistor} />
      {children}
    </Provider>
  );
}
