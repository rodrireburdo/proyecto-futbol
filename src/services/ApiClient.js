import axios from "axios";
import JwtService from "./JwtService";
import { Static } from "vue";

const apiClient = axios.create({
	baseURL: 'https://localhost:8080',
	headers: {
        'Authorization': `Bearer ${JwtService.getToken()}`
    }
}); 

export default apiClient;