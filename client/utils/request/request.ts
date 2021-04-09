import axios, {AxiosInstance} from "axios";
import {Environment} from "../../environment";
import {interceptor} from "./interceptor";

const request: AxiosInstance = axios.create({
    baseURL: Environment.BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',

    }
});

interceptor(request);

export {request};
