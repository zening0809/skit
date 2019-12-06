/**
 * store 基础方法混入
 */
export default {
    computed: {
        app () {
            return this.$store.state.app
        },
        enums () {
            return this.$store.state.enums
        }
    },
    methods: {
        // 根据类型查询枚举值
        queryEnums (type) {
            return this.$store.dispatch('enums/queryEnums', type)
        },
        getEnumVal (type, key) {
            if (!this.enums[type] || !this.enums[type].map || !this.enums[type].map[key]) {
                return
            }
            return this.enums[type].map[key].value
        },
        // 根据路径查询路由元数据
        getRouteMetaByPath (path) {
            const routes = this.app.routes
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].path === path) {
                    return routes[i].meta
                }
            }
        }
    }
}
