import {AuthActionsTypes, AuthState} from "../../types/auth";

const initialState: AuthState = {
    isAuthorized: false,
};

export const authReducer = (state = initialState, action) => {

    const {payload} = action;

    switch (action.type) {
        case AuthActionsTypes.IS_AUTHORIZED: {
            return {
                ...state,
                isAuthorized: payload
            };
        }

        default:
            return state;
    }
};
