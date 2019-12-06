/**
 * 基础页公共方法混入
 */
import StoreBase from './storeBase'
export default {
    mixins: [ StoreBase ],
    computed: {
        state () {
            return this.$store.state[this.storeKey]
        }
    },
    beforeDestroy () {
        this.resetState()
        this.unRegistStore()
    },
    methods: {
        // 注册页面私有store
        registStore (store) {
            if (store && !(this.storeKey in this.$store._modules.root._children)) {
                this.$store.registerModule(this.storeKey, store)
            }
        },
        // 卸载页面私有store
        unRegistStore () {
            if (this.storeKey in this.$store._modules.root._children) {
                this.$store.unregisterModule(this.storeKey)
            }
        },
        // 调用store中的action
        dispatch (action, payload) {
            return this.$store.dispatch(this.storeKey + '/' + action, payload)
        },
        // 调用store中的mutation
        commit (mutation, payload) {
            this.$store.commit(this.storeKey + '/' + mutation, payload)
        },
        // 更新state
        updateState (payload) {
            this.commit('update', payload)
        },
        // 重置state
        resetState () {
            this.commit('reset')
        }
    }
}
