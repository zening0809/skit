import Vue from 'vue'
import Draggable from 'vuedraggable'
import '@/libs/element'
import '@/directives'
import router from '@/router'
import store from '@/store'
import App from './App'
import '@/permission'

Vue.component('draggable', Draggable)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
