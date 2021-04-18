import {apiRequest} from "../utils/request";
import {ICallbacks} from "../utils/request/types";

export class UserService {
    update(data, token, callbacks: ICallbacks) {
        apiRequest({
            url: '/user/profile',
            method: 'PUT',
            data,
            token,
            callbacks
        });
    }

    get(token) {
        return new Promise((resolve) => {
            apiRequest({
                url: "/user/profile",
                method: "GET",
                token,
                callbacks: {
                    success: (res) => {resolve(res);}
                }
            });
        });
    }

    getById(id) {
        return new Promise((resolve) => {
            apiRequest({
                url: `/user/${id}`,
                method: "GET",
                callbacks: {
                    success: (res) => {resolve(res);}
                }
            });
        });
    }
}
