
export default function clearToken() {
    let accessToken = window.LS.get("accessToken");
    if(accessToken){
        window.LS.set("accessToken", "");
    }
}