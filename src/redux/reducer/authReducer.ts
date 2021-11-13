import { AuthState, SET_USER, SET_LOADING, SIGN_OUT, SET_ERROR, AuthAction, SET_SUCCESS, NEED_VERIFICATION } from '../types';

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: '',
    success: '',
    needVerification: false
}

const authReducer = (state = initialState, action: AuthAction) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case SET_LOADING: 
            return {
                ...state,
                isLoading: action.payload
            }
        case SIGN_OUT: 
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case NEED_VERIFICATION:
            return {
                ...state,
                needVerification: true
            }
        default:
            return state;
    }
}

export default authReducer;