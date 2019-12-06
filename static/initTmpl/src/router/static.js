const ROUTES = CNST.ROUTES

const statics = []
for (let key in ROUTES) {
    statics.push(ROUTES[key])
}
export default statics
