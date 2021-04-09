export enum AuthActionsTypes {
    IS_AUTHORIZED = 'IS_AUTHORIZED',

    LOGOUT = 'LOGOUT'
}

export interface ILogin {
    email: string,
    password: string
}

export interface IRegister {
    email: string,
    password: string,
    name: string
}

export interface AuthState {
    isAuthorized: boolean;
}
