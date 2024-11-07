import apiClient from "./ApiClient";
//import JwtService from "./JwtService";

class AdminService {
    static async getAreas() {
        try{
            const response = await apiClient.get(`/admin/area/listar`);

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
            console.log("pinto error areas")
            return null;
        }
    }

    static async getRoles() {
        try{
            const response = await apiClient.get(`/admin/role/listar`);

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
                console.log("error al obtener roles")
                return null
            }
        }catch(error){
            console.log("pinto error roles")
            return null;
        }
    }

    static async postUser(user) {
        try{
            const response = await apiClient.post(`/admin/user/crear`, user);

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
}

export default AdminService;