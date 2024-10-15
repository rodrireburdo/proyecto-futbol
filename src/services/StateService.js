import apiClient from "./ApiClient";

class StateService {
    static async listStates() {
        try{
            const response = await apiClient.get(`players/estados`);

            if(response.status >= 200 && response.status < 300){
                return response.data;
            }else if(response.status == 403){
                console.log("no tiene permisos")
                this.logOut();
                return null
            } else if(response.status == 400){
                console.log("mala peticion")
                return null
            } else{
                console.log("error al obtener estados")
                return null
            }
        }catch(error){
            console.log("pinto error stados")
            return null;
        }
    }
} 

export default StateService;