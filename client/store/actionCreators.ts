import {store} from './index';

// @ts-ignore
const dispatch = store().dispatch;

export const onLoading = (type, payload?) => {
    dispatch({ type, payload });
};

export const onSuccess = (type, payload?) => {
    dispatch({ type, payload });
};

export const onError = (type, payload?) => {
    dispatch({ type, payload });
};

export const getAction = (type, payload) => ({type, payload});
