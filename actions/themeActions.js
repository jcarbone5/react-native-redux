import * as themeTypes from '../types/themeTypes'
import asyncStorage from '@react-native-async-storage/async-storage'

export const defaultTheme = () => {
    return async dispatch => {
        await asyncStorage.setItem("theme", "default");
        
        dispatch({ type: themeTypes.SET_DEFAULT_THEME })
    }
}

export const darkTheme = () => {
    return async dispatch => {
        await asyncStorage.setItem("theme", "dark");

        dispatch({ type: themeTypes.SET_DARK_THEME })
    }
}

export const getTheme = () => {
    return async dispatch => {
        try {
            const themeValue = await asyncStorage.getItem("theme");
            
            if(themeValue) {
                themeValue === "dark" 
                    ? await dispatch(darkTheme()) 
                    : await dispatch(defaultTheme());
            }
        } catch (error) {
            console.log(error)
        }
    }
}