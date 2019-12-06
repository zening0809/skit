import Vue from 'vue'
import Vuex from 'vuex'

// 全局状态
import app from './modules/app'
import enums from './modules/enums'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        enums
    }
})

export default store
