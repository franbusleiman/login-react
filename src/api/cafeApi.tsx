import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const url = "http://144.22.55.224:8085/api/"


export const cafeApi = axios.create({baseURL:url});


cafeApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem("token");

        if(token){
            config.headers['x-token']= token;
        }
        return config;
    }
)