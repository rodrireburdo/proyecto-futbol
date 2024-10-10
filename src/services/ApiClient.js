import axios from "axios";
//import JwtService from "./JwtService";

const apiClient = axios.create({
	baseURL: 'http://localhost:8080/',
    headers: {'Authorization': `Bearer ${JwtService.getToken()}`}
}); 

export default apiClient;