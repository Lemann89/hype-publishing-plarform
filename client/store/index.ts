import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {reducer, RootState} from "./reducers";
import {AnyAction, configureStore} from "@reduxjs/toolkit";
import {ThunkDispatch} from "redux-thunk";

const store: MakeStore<RootState> = (context: Context) => configureStore({reducer});

export const wrapper = createWrapper<RootState>(store, {debug: true});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

export {store};
