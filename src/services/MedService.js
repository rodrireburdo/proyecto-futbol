import apiClient from "./ApiClient";

class MedService {
    static async searchPlayer(dni) {
        try{
            const response = await apiClient.get(`players/buscar/${dni}`);

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
                console.log("error al obtener perfil")
                return null
            }
        }catch(error){
            console.log("pinto error atender")
            return null;
        }
    }
} 

export default MedService;