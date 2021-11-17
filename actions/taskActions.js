import * as taskTypes from '../types/taskTypes'
import axiosConfig from '../config/axiosConfig'

export const getTasks = () => {
    return async dispatch => {
        try {
            dispatch(isLoading(true));

            const response = await axiosConfig.get("/api/tasks/");

            if (!response.data.errors) {
                dispatch({ type: taskTypes.TASK_GET_ALL, payload: response.data });
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isLoading(false));
        }
    }
}

export const getOneTask = id => {
    return async dispatch => {
        try {
            dispatch(isLoading(true));

            const response = await axios.get("/api/tasks/" + id);

            if (!response.data.errors) {
                dispatch({
                    type: types.taskGetOne,
                    payload: response.data.task
                });
            } else {
                dispatch(showErrors(response.data.message));
            }
        } catch (error) {
            const { errors, message } = error.response.data;
            errors ? dispatch(showErrors(message)) : dispatch(showErrors(error));
        } finally {
            dispatch(isLoading(false));
        }
    }
}

export const createTask = task => {
    return async dispatch => {
        try {
            dispatch(isLoading(true));

            const response = await axiosConfig.post("/api/tasks/", task);

            if (!response.data.errors) {
                dispatch({
                    type: taskTypes.TASK_CREATE,
                    payload: response.data
                });

                dispatch(redirect("HomeScreen"))
            } else {
                dispatch(showErrors(response.data.message));
            }
        } catch (error) {
            const { errors, message } = error.response.data;
            errors ? dispatch(showErrors(message)) : dispatch(showErrors(error));
        } finally {
            dispatch(isLoading(false));
        }
    }
}

export const deleteTask = id => {
    return async dispatch => {
        try {
            dispatch(isLoading(true));

            const response = await axiosConfig.delete("/api/tasks/" + id);

            if (!response.data.errors) {
                dispatch({
                    type: taskTypes.TASK_DELETE,
                    payload: id
                });
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(isLoading(false));
        }
    }
}

export const updateTask = (id, task) => {
    return async dispatch => {
        try {
            dispatch(isLoading(true));

            const response = await axiosConfig.put("/api/tasks/" + id, task);

            if (!response.data.errors) {
                dispatch({
                    type: taskTypes.TASK_UPDATE,
                    payload: response.data
                });

                dispatch(redirect("HomeScreen"))
            } else {
                dispatch(showErrors(response.data.message));
            }
        } catch (error) {
            const { errors, message } = error.response.data;
            errors ? dispatch(showErrors(message)) : dispatch(showErrors(error));
        } finally {
            dispatch(isLoading(false));
        }
    }
}

export const toggleTask = task => {
    return async dispatch => {
        try {
            dispatch(isLoading(true));

            const taskUpdated = { ...task, done: !task.done }

            const response = await axiosConfig.put("/api/tasks/" + task._id, taskUpdated);

            if (!response.data.errors) {
                dispatch({
                    type: taskTypes.TASK_UPDATE,
                    payload: response.data
                });
            } else {
                dispatch(showErrors(response.data.message));
            }
        } catch (error) {
            const { errors, message } = error.response.data;
            errors ? dispatch(showErrors(message)) : dispatch(showErrors(error));
        } finally {
            dispatch(isLoading(false));
        }
    }
}

export const setSelectedTask = task => ({ type: taskTypes.TASK_SELECTED, payload: task })

export const removeSelectedTask = () => ({ type: taskTypes.TASK_SELECTED, payload: null })

const isLoading = payload => ({ type: taskTypes.TASK_LOADING, payload })

const redirect = screen => {
    return dispatch => {
        dispatch({ type: taskTypes.TASK_REDIRECT, payload: screen });

        setTimeout(() => {
            dispatch({ type: taskTypes.TASK_REDIRECT, payload: null });
        }, 500);
    }
}

const showErrors = message => {
    return dispatch => {
        dispatch({ type: taskTypes.TASK_ERRORS, payload: message });

        setTimeout(() => {
            dispatch({ type: taskTypes.TASK_ERRORS, payload: null });
        }, 3000);
    }
}