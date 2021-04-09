import {Method} from "axios";

export interface ICallbacks {
    loading?: (loading: boolean) => void,
    success?: (response: any) => void,
    error?: (error: any) => void,
}

export interface IReduxHandlers {
    reduxLoading?: (loading: boolean) => void,
    reduxSuccess?: (success: any) => void,
    reduxError?: (error: any) => void,
}

export interface IRequest {
    url: string,
    method: Method,
    data?: any,
    callbacks?: ICallbacks,
    reduxHandlers?: IReduxHandlers,
    rawResponse?: boolean,
    token?: string | null
}
