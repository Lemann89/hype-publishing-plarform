import {AxiosResponse} from "axios";
import {toast, ToastTypes} from "../toast/toast";


const onSuccess = (res): AxiosResponse => {

    const token = res.data.token;
    const isLogin = res.config.url === '/auth/login';

    if (isLogin && token) {
        toast(ToastTypes.SUCCESS, 'Success', 'You successfully signed in');
    }

    return res;
};

const onError = (err) => {
    console.log(err.message);
};

export const interceptor = (axios) => {
    axios.interceptors.response.use(onSuccess, onError);
};
