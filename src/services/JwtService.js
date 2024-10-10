class JwtService{

    static TOKEN_KEY = "AuthToken"
    static DNI_KEY = "AuthDni"
    static AUTHORITY_KEY = "AuthAuthority"

    static setToken(token) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    static getToken() {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    static setDni(dni) {
        window.sessionStorage.removeItem(DNI_KEY);
        window.sessionStorage.setItem(DNI_KEY, dni);
    }

    static getDni() {
        return window.sessionStorage.getItem(DNI_KEY);
    }

    static setAuthority(auth) {
        window.sessionStorage.removeItem(AUTHORITY_KEY);
        window.sessionStorage.setItem(AUTHORITY_KEY, auth);
    }

    static getAuthority() {
        return window.sessionStorage.getItem(AUTHORITY_KEY);
    }

    logOut() {
        window.sessionStorage.clear();
    }
}

export default JwtService;