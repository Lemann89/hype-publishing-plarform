import { HYDRATE } from "next-redux-wrapper";
import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {userReducer} from "./userReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        if (state.count) nextState.count = state.count;
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};

export type RootState = ReturnType<typeof rootReducer>
