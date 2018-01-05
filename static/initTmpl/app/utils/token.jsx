export default {
    setToken(token) {
        window.LS.set("accessToken", token);
    },
    getToken() {
        let accessToken = window.LS.get("accessToken");
        return accessToken;
    },
    clearToken() {
        let accessToken = window.LS.get("accessToken");
        if(accessToken){
            window.LS.set("accessToken", "");
        }
    }
}