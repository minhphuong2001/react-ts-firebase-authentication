import { ThunkAction } from "redux-thunk";
import {
    AuthAction,
    SET_USER, SignUpData,
    SignInData, User,
    SIGN_OUT, SET_LOADING,
    SET_ERROR, SET_SUCCESS,
    NEED_VERIFICATION
} from "../types";
import { RootState } from '../store'
import firebase from '../../firebase/config'

// get user by id
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        try {
            const user = await firebase.firestore().collection('users').doc(id).get();
            if (user.exists) {
                const userData = user.data() as User;

                dispatch({
                    type: SET_USER,
                    payload: userData
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

// register
export const register = (data: SignUpData): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);

            if (response.user) {
                const userData: User = {
                    email: data.email,
                    username: data.username,
                    id: response.user.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                await firebase.firestore().collection('users').doc(response.user.uid).set(userData);
                await response.user.sendEmailVerification();

                dispatch(setNeedVerification())

                dispatch({
                    type: SET_USER,
                    payload: userData
                })

                console.log(response.user);
            }
        } catch (error: any) {
            console.log(error);
            dispatch(setError(error))
        }
    }
}

// login
export const login = (data: SignInData): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            console.log('loggin successfully with:', data.email);
        } catch (error: any) {
            console.log(error);
            dispatch(setError(error.message))
        }
    }
}

// logout
export const logout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut();
            dispatch({
                type: SIGN_OUT
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// set loading 
export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return (dispatch) => {
        dispatch({
            type: SET_LOADING,
            payload: value
        })
    }
}

// set error 
export const setError = (message: string): ThunkAction<void, RootState, null, AuthAction> => {
    return (dispatch)=> {
        dispatch({
            type: SET_ERROR,
            payload: message
        })
    }
}

// set success 
export const setSuccess = (message: string): ThunkAction<void, RootState, null, AuthAction> => {
    return (dispatch)=> {
        dispatch({
            type: SET_SUCCESS,
            payload: message
        })
    }
}

// verify acc 
export const setNeedVerification = (): ThunkAction<void, RootState, null, AuthAction> => {
    return (dispatch) => {
        dispatch({
            type: NEED_VERIFICATION
        })
    }
}

// send password reset email
export const sendPasswordResetEmail = (email: string, message: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async (dispatch) => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            dispatch(setSuccess(message));
        } catch (error: any) {
            console.log(error);
            dispatch(setError(error.message));
        }
    }
}