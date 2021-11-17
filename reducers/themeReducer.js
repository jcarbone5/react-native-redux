import * as themeTypes from '../types/themeTypes'

const defaultTheme = {
    dark: false,
    colors: {
        primary: '#78678c',
        background: '#ffffff',
        card: 'rgb(255, 255, 255)',
        text: 'black',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const darkTheme = {
    dark: true,
    colors: {
        primary: '#78678c',
        background: '#242424',
        card: 'rgb(255, 255, 255)',
        text: '#ffffff',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

export default function themeReducer(state = defaultTheme, action) {
    switch (action.type) {
        case themeTypes.SET_DEFAULT_THEME:
            return {
                ...defaultTheme
            }

        case themeTypes.SET_DARK_THEME:
            return {
                ...darkTheme
            }

        default:
            return state;
    }
}