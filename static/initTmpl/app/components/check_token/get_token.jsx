
export default function getToken() {
    let accessToken = window.LS.get("accessToken");
    return accessToken;
}