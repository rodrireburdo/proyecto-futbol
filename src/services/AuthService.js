import axios from "axios";
import JwtService from "./JwtService";
import { ref } from "vue"

class AuthService {

    static isLogg = ref(false)
    static async logIn(Dni, Password) {
        let credentials = {
            dni: Dni,
            password: Password
        }
        let res = false;
        try{
            const response = await axios.post(`http://localhost:8080/auth/login`, credentials);
            if(response.status >= 200 && response.status < 300){
                JwtService.setDni(response.data.dni)
                JwtService.setToken(response.data.token)
                JwtService.setAuthority(response.data.userType)
                JwtService.isLogg = true
                if(response.data.userType == "STAFF") JwtService.setArea(response.data.area)
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

    static logOut() {
        JwtService.logOut()
        this.isLogg.value = false
    }

    static isLogged() {
        let log = true
        if(JwtService.getToken() == null) log = false;
        if(JwtService.getDni() == null) log = false;
        if(JwtService.getAuthority() == null) log = false;
        this.isLogg.value = log;
        return log;
    }
}

export default AuthService;