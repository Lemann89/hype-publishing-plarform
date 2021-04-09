import {apiRequest} from "../utils/request";
import {ICallbacks} from "../utils/request/types";

export class userService {
    update(data, token, callbacks: ICallbacks) {
        apiRequest({
            url: '/user/profile',
            method: 'PUT',
            data: data,
            token,
            callbacks
        });
    }

    getPosts(token) {
        return new Promise((resolve) => {
            apiRequest({
                url: "/user/profile",
                method: "GET",
                token,
                callbacks: {
                    success: (res) => {resolve(res.posts);}
                }
            });
        });
    }
}
