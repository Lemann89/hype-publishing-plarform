import {apiRequest} from "../utils/request";
import {ICallbacks} from "../utils/request/types";
import {ILogin, IRegister} from "../types/auth";

export const login = (data: ILogin, callbacks: ICallbacks) => {
    apiRequest({
        url: "/auth/login",
        method: "POST",
        data: JSON.stringify(data),
        callbacks
    });
};

export const signup = (data: IRegister, callbacks: ICallbacks) => {
    apiRequest({
        url: "/auth/register",
        method: "POST",
        data: JSON.stringify(data),
        callbacks
    });
};
