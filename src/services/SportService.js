import apiClient from "./ApiClient";
//import JwtService from "./JwtService";

class SportService {

    static async saveSport(sport) {
        try{
            const response = await apiClient.post(`/admin/sport/crear`, sport);

            if(response.status >= 200 && response.status < 300){
                return response;
            }else if(response.status == 403){
                console.log("no tiene permisos")
                this.logOut();
                return null
            } else if(response.status == 400){
                console.log("error")
                return null
            } else{
                console.log("error al crear usuario")
                return null
            }
        }catch(error){
            console.log("pinto error usuario")
            return null;
        }
    }

    static async getSports() {
        try{
            const response = await apiClient.get(`/admin/sport/listar`);

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
                console.log("error al obtener usuarios")
                return null
            }
        }catch(error){
            console.log("pinto error usuarios")
            return null;
        }
    }

    static async editSport(sportE) {
        try{
            let sport = {
                sportName: sportE.sportName
            }
            const response = await apiClient.put(`/admin/sport/editar/${sportE.idSport}`, sport);
            
            if(response.status >= 200 && response.status < 300){
                return response;
            }else if(response.status == 403){
                console.log("no tiene permisos")
                this.logOut();
                return null
            } else if(response.status == 400){
                console.log("error")
                return null
            } else{
                console.log("error al obtener usuarios")
                return null
            }
        }catch(error){
            console.log("pinto error usuarios")
            return null;
        }
    }
}

export default SportService;