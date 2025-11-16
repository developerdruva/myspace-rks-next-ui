"use client"
import { applyMiddleware, legacy_createStore as createStore } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
import { composeWithDevTools } from "@redux-devtools/extension";

import { thunk } from "redux-thunk";

import rootReducer from "./reducers/rootReducer";


export const reduxStore = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));