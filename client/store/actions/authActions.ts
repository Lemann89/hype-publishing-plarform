import {getAction} from "../actionCreators";
import {AuthActionsTypes} from "../../types/auth";

export const setIsAuthorized = (isAuthorized) => getAction(AuthActionsTypes.IS_AUTHORIZED, isAuthorized);
