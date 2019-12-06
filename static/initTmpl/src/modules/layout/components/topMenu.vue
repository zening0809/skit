<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('app', ['allMenus', 'sdMenus', 'actTab', 'routeMap']),
        topMenus () {
            const allMenus = this.allMenus
            const topMenus = []
            for (let i = 0, len = allMenus.length; i < len; i++) {
                topMenus.push(allMenus[i])
            }
            return topMenus
        }
    },
    watch: {
        actTab: {
            immediate: true,
            handler: function (newVal) {
                // 刷新时，获取侧边菜单
                if (newVal && !this.sdMenus.length) {
                    const topCode = _.get(this.routeMap[newVal], 'meta.parentCodes[0]')
                    const allMenus = this.allMenus
                    for (let i = 0, len = allMenus.length; i < len; i++) {
                        if (allMenus[i].code === topCode) {
                            this.$store.commit('app/update', { sdMenus: allMenus[i].children })
                            break
                        }
                    }
                }
            }
        }
    },
    render () {
        const actCode = _.get(this.routeMap[this.actTab], 'meta.parentCodes[0]')
        return (
            <ul class="top-menu">
            {
                this.topMenus.map(item => {
                    return (
                        <li class="menu-item">
                            <a class={['menu-link',  actCode === item.code ? 'menu-link--active' : undefined].join(' ')} onClick={() => this.onMenuClick(item)}>{item.moduleName}</a>
                        </li>
                    )
                })
            }
            </ul>
        )
    },
    methods: {
        // 获取第一个叶子节点
        getFirstLeafNode (menus) {
            if (menus[0].children && menus[0].children.length) {
                return this.getFirstLeafNode(menus[0].children)
            } else {
                return menus[0]
            }
        },
        onMenuClick ({ code, children }) {
            // 当前菜单已经处于激活状态，直接返回
            if (_.get(this.routeMap[this.actTab], 'meta.parentCodes[0]') === code) {
                return
            }
            if (children && children.length) {
                const node = this.getFirstLeafNode(children)
                this.$store.commit('app/update', { sdMenus: children })
                this.$store.commit('app/actNavTab', { code: node.code })
                return
            } else {
                this.$store.commit('app/actNavTab', { code })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.top-menu {
    .menu-item {
        display: inline-block;
        padding: 0 15px;
    }
    .menu-link {
        display: block;
        padding: 0 9px;
        height: $--tb-height;
        color: $--tb-menu-color;
        box-sizing: border-box;
    }
    .menu-link--active {
        color: $--sd-menu-active-color;
        border-bottom: 3px solid $--sd-menu-active-color;
    }
}
</style>

