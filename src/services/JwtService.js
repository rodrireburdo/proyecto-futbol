class JwtService{

    static TOKEN_KEY = "AuthToken"
    static DNI_KEY = "AuthDni"
    static AUTHORITY_KEY = "AuthAuthority"
    static AREA_KEY = "AuthRole"

    constructor(){
    }

    static setToken(token) {
        window.sessionStorage.removeItem(this.TOKEN_KEY);
        window.sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    static getToken() {
        return window.sessionStorage.getItem(this.TOKEN_KEY);
    }

    static setDni(dni) {
        window.sessionStorage.removeItem(this.DNI_KEY);
        window.sessionStorage.setItem(this.DNI_KEY, dni);
    }

    static getDni() {
        return window.sessionStorage.getItem(this.DNI_KEY);
    }

    static setAuthority(auth) {
        window.sessionStorage.removeItem(this.AUTHORITY_KEY);
        window.sessionStorage.setItem(this.AUTHORITY_KEY, auth);
    }

    static getAuthority() {
        return window.sessionStorage.getItem(this.AUTHORITY_KEY);
    }

    static setArea(area) {
        window.sessionStorage.removeItem(this.AREA_KEY);
        window.sessionStorage.setItem(this.AREA_KEY, area);
    }

    static getArea() {
        return window.sessionStorage.getItem(this.AREA_KEY);
    }

    static logOut() {
        window.sessionStorage.clear();
    }
}

export default JwtService;