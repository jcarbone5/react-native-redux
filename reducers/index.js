import { combineReducers } from 'redux'

//Reducers
import authReducer from './authReducer'
import taskReducer from './taskReducer'
import themeReducer from './themeReducer'

const rootReducers = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
    theme: themeReducer
});

export default rootReducers;