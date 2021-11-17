import * as taskTypes from '../types/taskTypes'

const initialState = {
    tasks: [],
    selectedTask: null,
    loading: false,
    redirectTo: null,
    errors: null
}

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case taskTypes.TASK_GET_ALL:
            return {
                ...state,
                tasks: action.payload.tasks,
                loading: false,
                errors: null
            }

        case taskTypes.TASK_CREATE:
            return {
                ...state,
                tasks: [...state.tasks, action.payload.task],
            }

        case taskTypes.TASK_UPDATE:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload.task._id ? action.payload.task : task),
                selectedTask: null
            }

        case taskTypes.TASK_DELETE:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                selectedTask: null
            }

        case taskTypes.TASK_SELECTED:
            return {
                ...state,
                selectedTask: action.payload
            }

        case taskTypes.TASK_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case taskTypes.TASK_REDIRECT:
            return {
                ...state,
                redirectTo: action.payload
            }

        case taskTypes.TASK_ERRORS:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}