import {UserActionsTypes} from "../../types/user";

const initialState = {
    info: {
        email: '',
        name: '',
        img: {},
        description: ''
    },

    posts: []
};

export const userReducer = (state = initialState, action) => {
    const {payload} = action;

    switch (action.type) {
        case UserActionsTypes.PROFILE:
            return {
                ...state,
                info: payload.info,
                posts: payload.posts
            };

        case UserActionsTypes.USER_INFO:
            return {
                ...state,
                info: payload
            };

        default:
            return state;
    }
};
