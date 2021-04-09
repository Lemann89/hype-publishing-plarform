import {store} from 'react-notifications-component';

export enum ToastTypes {
    SUCCESS = 'success',
    DANGER = 'danger',
    INFO = 'info',
    DEFAULT = 'default',
    WARNING = 'warning',
}

export const toast = (type: ToastTypes, title: string, message: string) => {
    return store.addNotification({
        title: title,
        message: message,
        type: type,
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        }
    });
};
