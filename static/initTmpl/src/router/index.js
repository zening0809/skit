import Vue from 'vue'
import VueRouter from 'vue-router'

// 用于处理本地location报错的问题
const VPUSH = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onComplete, onAbort) {
    try {
        return VPUSH.call(this, location, onComplete, onAbort).catch(err => err)
    } catch (error) {
        console.log(error);
    }
}

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [

    ]
})

export default router
