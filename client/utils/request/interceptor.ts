import {AxiosResponse} from "axios";
import { store } from 'react-notifications-component';


const onSuccess = (res): AxiosResponse => {

    const token = res.data.token;
    const isLogin = res.config.url === '/auth/login';
    const isLogout = res.config.url === '/auth/logout';

    if (isLogin && token) {
        store.addNotification({
            title: "Success",
            message: "You successfully signed in",
            type: "success",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000,
                onScreen: true
            }

        });
    }

    return res;
};

const onError = (err) => {
    console.log(err);
};

export const interceptor = (axios) => {
    axios.interceptors.response.use(onSuccess, onError);
};
