import apiClient from "./ApiClient";
//import JwtService from "./JwtService";

class RoleService {

    static async saveRole(RoleN) {
        try{
            let Role = {
                name: RoleN.roleName,
                area: RoleN.area.nameArea
            }
            const response = await apiClient.post(`/admin/role/crear`, Role);

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
                console.log("error al obtener usuarios")
                return null
            }
        }catch(error){
            console.log("pinto error usuarios")
            return null;
        }
    }

    static async editRole(RoleE) {
        try{
            let Role = {
                name: RoleE.roleName,
                area: RoleE.area.nameArea
            }
            const response = await apiClient.put(`/admin/role/editar/${RoleE.idRole}`, Role);
            
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

export default RoleService;