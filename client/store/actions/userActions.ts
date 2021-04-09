import {Dispatch} from "react";
import {apiRequest} from "../../utils/request";
import {UserActionsTypes} from "../../types/user";
import {getAction} from "../actionCreators";

export const getUserProfile = (token) => async (dispatch: Dispatch<any>) => {

    return await apiRequest({
        url: '/user/profile',
        method: 'GET',
        token,
        callbacks: {
            success: (res) => {
                console.log(res);

                const user = {
                    ...res,
                    info: {
                        email: res.email,
                        name: res.name,
                        img: res.img,
                        description: res.description || null,
                    }
                };

                delete user.email;
                delete user.name;

                dispatch({type: UserActionsTypes.PROFILE, payload: user});
            }
        }
    });
};

export const setUserInfo = (info) => getAction(UserActionsTypes.USER_INFO, info);
