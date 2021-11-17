import * as authTypes from '../types/authTypes'

const initialState = {
    user: null,
    authenticated: false,
    token: null,
    loading: false,
    errors: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case authTypes.AUTH_LOGIN:
        case authTypes.AUTH_REGISTER:
        case authTypes.AUTH_RENEW:
            return {
                ...state,
                user: action.payload.user,
                authenticated: true,
                token: action.payload.token,
                loading: false,
                errors: null
            }

        case authTypes.AUTH_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case authTypes.AUTH_ERRORS:        
            return {
                ...state,
                errors: action.payload
            }

        case authTypes.AUTH_LOGOUT:
            return initialState;

        default:
            return state;
    }
}