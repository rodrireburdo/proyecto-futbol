import apiClient from "./ApiClient";
//import JwtService from "./JwtService";

class CategoriesService {

    static async saveCategory(category) {
        try{
            let categoryN = {categoryName: category.categoryName, sport: category.sport}
            const response = await apiClient.post(`/admin/categoria/crear`, categoryN);

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
                console.log("error al crear categoria")
                return null
            }
        }catch(error){
            console.log("pinto error categoria")
            return null;
        }
    }

    static async getCategories() {
        try{
            const response = await apiClient.get(`/admin/categoria/listar`);

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

    static async editCategory(category) {
        try{
            let categoryE = {categoryName: category.categoryName, sport: category.sport}
            const response = await apiClient.put(`/admin/categoria/editar/${category.idCategory}`, categoryE);

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

export default CategoriesService;