import * as authTypes from '../types/authTypes'
import axiosConfig from '../config/axiosConfig'
import asyncStorage from '@react-native-async-storage/async-storage'

export const login = user => {
    return async dispatch => {
        try {
            dispatch(isLoading(true))

            const response = await axiosConfig.post("/api/auth/login", user);

            if (!response.data.errors) {
                await asyncStorage.setItem("token_tasks", response.data.token);

                dispatch({ type: authTypes.AUTH_LOGIN, payload: response.data });
            } else {
                dispatch(showErrors(response.data.message));
            }
        } catch (error) {
            dispatch(showErrors(error.response.data.message));
        } finally {
            dispatch(isLoading(false))
        }
    }
}

export const register = user => {
    return async dispatch => {
        try {
            dispatch(isLoading(true))

            const response = await axiosConfig.post("/api/auth/register", user);

            if (!response.data.errors) {
                await asyncStorage.setItem("token_tasks", response.data.token);

                dispatch({ type: authTypes.AUTH_REGISTER, payload: response.data });
            } else {
                dispatch(showErrors(response.data.message));
            }
        } catch (error) {
            dispatch(showErrors(error.response.data.message));
        } finally {
            dispatch(isLoading(false));
        }
    }
}

export const renew = () => {
    return async dispatch => {
        try {
            dispatch(isLoading(true))

            const response = await axiosConfig.get("/api/auth/renew");

            if (!response.data.errors) {
                await asyncStorage.setItem("token_tasks", response.data.token);

                dispatch({ type: authTypes.AUTH_RENEW, payload: response.data });
            } else {
                dispatch(showErrors(response.data.message));
            }
        } catch (error) {
            dispatch(showErrors(error.response.data.message));
        } finally {
            dispatch(isLoading(false))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        try {
            await asyncStorage.removeItem("token_tasks");

            dispatch({ type: authTypes.AUTH_LOGOUT });
        } catch (error) {
            console.log(error)
        }
    }
}

const isLoading = payload => ({ type: authTypes.AUTH_LOADING, payload });

const showErrors = message => {
    return dispatch => {
        dispatch({ type: authTypes.AUTH_ERRORS, payload: message });

        setTimeout(() => {
            dispatch({ type: authTypes.AUTH_ERRORS, payload: null });
        }, 4000);
    }
}