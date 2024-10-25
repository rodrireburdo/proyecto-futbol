import apiClient from "./ApiClient";

class MedService {
    static async searchPlayer(dni, page = 0, size = 5) {
        try {
            const response = await apiClient.get(`players/buscar/${dni}`, {
                params: { page, size }
            });

            if(response.status >= 200 && response.status < 300) {
                return response.data;
            } else if(response.status == 403) {
                console.log("No tiene permisos");
                this.logOut();
                return null;
            } else if(response.status == 400) {
                console.log("DNI incorrecto");
                return null;
            } else {
                console.log("Error al obtener perfil");
                return null;
            }
        } catch (error) {
            console.log("Ocurrió un error");
            return null;
        }
    }

    static async saveReport(report) {
        try{
            const response = await apiClient.post(`med/reportar`, report);

            if(response.status >= 200 && response.status < 300){
                return response;
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
} 

export default MedService;