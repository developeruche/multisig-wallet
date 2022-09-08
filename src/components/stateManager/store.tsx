import React, { createContext, useReducer } from "react";
import {
  userDetailReducer,
  userDetailState,
} from "./reducers";

const reduceReducers = (...reducers:any) => (prevState: any, value: any, ...args: any) => {
  return reducers.reduce(
    (newState: any, reducer: any) => reducer(newState, value, ...args),
    prevState
  );
};

const combinedReducers = reduceReducers(
  userDetailReducer,
);

const initialState = {
  ...userDetailState,
};

const store = createContext(initialState);
const { Provider } = store;

const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(combinedReducers, initialState) ;

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StoreProvider };