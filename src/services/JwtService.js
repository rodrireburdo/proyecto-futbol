class JwtService{

    static TOKEN_KEY = "AuthToken"
    static DNI_KEY = "AuthDni"
    static AUTHORITY_KEY = "AuthAuthority"
    static AREA_KEY = "AuthRole"

    constructor(){
    }

    static setToken(token) {
        sessionStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    static getToken() {
        return sessionStorage.getItem(this.TOKEN_KEY);
    }

    static setDni(dni) {
        sessionStorage.removeItem(this.DNI_KEY);
        sessionStorage.setItem(this.DNI_KEY, dni);
    }

    static getDni() {
        return sessionStorage.getItem(this.DNI_KEY);
    }

    static setAuthority(auth) {
        sessionStorage.removeItem(this.AUTHORITY_KEY);
        sessionStorage.setItem(this.AUTHORITY_KEY, auth);
    }

    static getAuthority() {
        return sessionStorage.getItem(this.AUTHORITY_KEY);
    }

    static setArea(area) {
        sessionStorage.removeItem(this.AREA_KEY);
        sessionStorage.setItem(this.AREA_KEY, area);
    }

    static getArea() {
        return sessionStorage.getItem(this.AREA_KEY);
    }

    static logOut() {
        sessionStorage.clear();
    }
}

export default JwtService;