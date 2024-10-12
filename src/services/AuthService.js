import axios from "axios";
import JwtService from "./JwtService";

class AuthService {
    static async logIn(Dni, Password) {
        let credentials = {
            dni: Dni,
            password: Password
        }
        let res = false;
        try{
            const response = await axios.post(`http://localhost:8080/auth/login`, credentials);
            if(response.status >= 200 && response.status < 300){
                console.log(response.data)
                JwtService.setDni(response.data.id)
                JwtService.setToken(response.data.token)
                JwtService.setAuthority(response.data.userType)
                if(response.data.userType == "STAFF") JwtService.setArea(response.data.area)
                console.log(JwtService.getToken()) 
                res = true;
            }else{
                console.log("no dio")
                res = false;
            }
        }catch(error){
            console.log("pinto error")
            res = false;
        }

        return res;
    }

    static isLogged() {
        if(JwtService.getToken() == null) return false;
        if(JwtService.getDni() == null) return false;
        if(JwtService.getAuthority() == null) return false;
        return true;
    }
}

export default AuthService;