
export default function clearToken(ctx) {
        let accessToken = window.LS.get("accessToken");
        if(accessToken){
            ctx.router.push(`/`);
        }
}