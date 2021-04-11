import {request} from "./index";
import {ICallbacks, IReduxHandlers, IRequest} from "./types";

export const apiRequest = ({
    url,
    method,
    data,
    callbacks = <ICallbacks>{},
    reduxHandlers = <IReduxHandlers>{},
    rawResponse = false,
    token = null
}: IRequest) => {

    const { loading, success, error } = callbacks;
    const { reduxLoading, reduxSuccess, reduxError } = reduxHandlers;

    loading && loading(true);
    reduxLoading && reduxLoading(true);

    if (token) {
        request.defaults.headers['Authorization'] = `Bearer ${token}`;
    }


    return request({ url, method, data })
        .then((res) => {
            success && success(rawResponse ? res : res.data);
            loading && loading(false);
            reduxSuccess && reduxSuccess(rawResponse ? res : res.data);
        })
        .catch((err) => {
            console.log(err)
            reduxError && reduxError(err.err || err);
            error && error(err.err || err);
        });
};
