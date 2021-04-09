import {apiRequest} from "../utils/request";

export class postService {
    getAll() {
        return new Promise((resolve) => {
            apiRequest({
                url: '/posts',
                method: "GET",
                callbacks: {
                    success: res => {resolve(res);}
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
}
