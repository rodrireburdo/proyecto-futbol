import apiClient from "./ApiClient";
import JwtService from "./JwtService";

class TecService {
    static async getCategories() {
        try{
            const response = await apiClient.get(`tec/categories?tec=${JwtService.getDni()}`);

            if(response.status >= 200 && response.status < 300){
                return response.data;
            }else if(response.status == 403){
                console.log("no tiene permisos")
                this.logOut();
                return null
            } else if(response.status == 400){
                console.log("dni incorrecto")
                return null
            } else{
                console.log("error al obtener categorias del usuario")
                return null
            }
        }catch(error){
            console.log("pinto error atender")
            return null;
        }
    }

    static async getPlayers(catId) {
        try{
            const response = await apiClient.get(`tec/players?tec=${JwtService.getDni()}&category=${catId}`);

            if(response.status >= 200 && response.status < 300){
                return response.data;
            }else if(response.status == 403){
                console.log("no tiene permisos")
                this.logOut();
                return null
            } else if(response.status == 400){
                console.log("datos incorrectos")
                return null
            } else{
                console.log("error al gaurdar")
                return null
            }
        }catch(error){
            console.log("pinto error gaur")
            return null;
        }
    }

    static async checkInPlayer(dni) {
        try{
            const response = await apiClient.put(`tec/checkin?dni=${dni}`);

            if(response.status >= 200 && response.status < 300){
                return response.data;
            }else if(response.status == 403){
                console.log("no tiene permisos")
                this.logOut();
                return null
            } else if(response.status == 400){
                console.log("dni incorrecto")
                return null
            } else{
                console.log("error al actualizar el usuario")
                return null
            }
        }catch(error){
            console.log("pinto error atender")
            return null;
        }
    }
} 

export default TecService;