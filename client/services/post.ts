import {apiRequest} from "../utils/request";
import {ICallbacks} from "../utils/request/types";

export class PostService {
    getAll() {
        return new Promise((resolve) => {
            apiRequest({
                url: '/posts',
                method: "GET",
                callbacks: {
                    success: res => {
                        resolve(res);
                    }
                }
            });
        });
    }

    getById(id) {
        return new Promise((resolve) => {
            apiRequest({
                url: `/posts/${id}`,
                method: "GET",
                callbacks: {
                    success: (res) => {
                        resolve(res);
                    }
                }
            });
        });
    }

    getByQuantity(quantity) {
        return new Promise((resolve) => {
            apiRequest({
                url: `/posts?quantity=${quantity}`,
                method: "GET",
                callbacks: {
                    success: (res) => {
                        resolve(res);
                    }
                }
            });
        });
    }

    getByTag(tag) {
        return new Promise((resolve) => {
            apiRequest({
                url: `/posts?tag=${tag}`,
                method: "GET",
                callbacks: {
                    success: (res) => {
                        resolve(res);
                    }
                }
            });
        });
    }

    create(data, token, callbacks: ICallbacks) {
        apiRequest({
            url: "/posts",
            method: "POST",
            data,
            token,
            callbacks
        });
    }

    update(id, data, token, callbacks: ICallbacks) {
        apiRequest({
            url: `/posts/${id}`,
            method: "PUT",
            data,
            token,
            callbacks
        });
    }

    delete(id, token, callbacks: ICallbacks) {
        apiRequest({
            url: `/posts/${id}`,
            method: "DELETE",
            token,
            callbacks
        });
    }
}
