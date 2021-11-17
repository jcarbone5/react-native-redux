import axios from 'axios'
import asyncStorage from '@react-native-async-storage/async-storage'

const axiosConfig = axios.create({
    baseURL: "https://node-tasks-restapi.herokuapp.com" //"http://192.168.1.13:4000"
});

axiosConfig.interceptors.request.use(async config => {
    const token = await asyncStorage.getItem("token_tasks");
    if(token) {
        config.headers["x-auth-token"] = token;
    }

    return config;
});

export default axiosConfig