export const SET_USER = 'SET_USER'
export const SET_LOADING = 'SET_LOADING'
export const SIGN_OUT = 'SIGN_OUT'
export const SET_ERROR = 'SET_ERROR'
export const SET_SUCCESS = 'SET_SUCCESS'
export const NEED_VERIFICATION = 'NEED_VERIFICATION'

export interface User {
    username: string
    email: string
    id: string
    createdAt: any
}

export interface AuthState {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string,
    success: string,
    needVerification: boolean
}

export interface SignUpData {
    username: string,
    email: string,
    password: string
}

export interface SignInData {
    email: string,
    password: string
}

// actions
interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof SIGN_OUT,
}

interface SetErrorAction {
    type: typeof SET_ERROR,
    payload: string
}

interface SetSuccessAction {
    type: typeof SET_SUCCESS,
    payload: string
}

interface NeedVerifyAction {
    type: typeof NEED_VERIFICATION
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | SetSuccessAction | NeedVerifyAction;