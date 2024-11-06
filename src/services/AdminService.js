import apiClient from "./ApiClient";
//import JwtService from "./JwtService";

class AdminService {
    static async getAreas() {
        try{
            const response = await apiClient.get(`area/listar`);

            if(response.status >= 200 && response.status < 300){
                return response.data;
            }else if(response.status == 403){
                console.log("no tiene permisos")
                this.logOut();
                return null
            } else if(response.status == 400){
                console.log("error")
                return null
            } else{
                console.log("error al obtener areas")
                return null
            }
        }catch(error){
            console.log("pinto error atender")
            return null;
        }
    }
}

export default AdminService;