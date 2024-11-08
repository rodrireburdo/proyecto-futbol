import axios from "axios";
import JwtService from "./JwtService";
import { ref, watch } from "vue"

let token = ref(JwtService.getToken());

const apiClient = axios.create({
    //baseURL: 'http://localhost:8080/'
    baseURL: 'https://playerpass-p.up.railway.app/'
});

apiClient.interceptors.request.use(config => {
    const currentToken = JwtService.getToken(); 
    if (currentToken) {
        config.headers['Authorization'] = `Bearer ${currentToken}`;
    }
    return config;
}, error => {
    console.log("hubo un error en cambiar el token", error);
    return Promise.reject(error);
});

watch(token, (newToken) => {
    // Se podría utilizar aquí para cualquier lógica adicional cuando el token cambie
    console.log("Token actualizado:", newToken);
});


export default apiClient;