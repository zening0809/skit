<script>
import { mapState } from 'vuex'
import theme from '@/styles/theme/index.scss'
export default {
    computed: {
        ...mapState('app', ['fold', 'allMenus', 'sdMenus', 'actTab', 'routeMap'])
    },
    render () {
        return (
            <el-menu
                class="side-menu"
                unique-opened={false}
                router={false}
                collapse={this.fold}
                text-color={theme.sdMenuColor}
                active-text-color={theme.sdMenuActiveColor}
                default-active={this.actTab}
                background-color={theme.sdMenuBg}
                onSelect={this.onSelect}>
                {this.getMenuItem(this.sdMenus)}
            </el-menu>
        )
    },
    methods: {
        getMenuIcon (menu) {
            if (menu.level === 2) {
                const icon = menu.icon || 'el-icon-menu'
                return <i class={icon}></i>
            }
        },
        getMenuItem (menus) {
            return menus.map((menu, index) => {
                return (
                    !menu.children || !menu.children.length
                        ? <el-menu-item index={menu.code}>
                            {this.getMenuIcon(menu)}
                            {/*
                                <b class="dotted_active"></b>
                            */}
                            <span class="leaf-title" slot="title">{menu.moduleName}</span>
                        </el-menu-item>
                        : <el-submenu index={menu.code}>
                            <template slot="title">
                                {this.getMenuIcon(menu)}
                                <span slot="title">{menu.moduleName}</span>
                            </template>
                            {this.getMenuItem(menu.children)}
                        </el-submenu>
                )
            })
        },
        onSelect (index) {
            this.$store.commit('app/actNavTab', { code: index })
        }
    }
}
</script>

<style lang="scss" scoped>
.el-menu {
    border-right: none;
}

.el-menu--collapse {
    width: $--sd-width-fold;

    > .el-menu-item,
    > .el-submenu {
        text-align: center;
    }
}

.el-menu:not(.el-menu--collapse) {
    .el-submenu {
        position: relative;
        &::after {
            position: absolute;
            top: 45px;
            bottom: 24px;
            left: 31px;
            content: '';
            border-left: 2px dotted #778CA2;
        }
        .el-menu-item {
            position: relative;
            &::after {
                position: absolute;
                top: 25px;
                left: 32px;
                width: 10px;
                content: '';
                border-bottom: 2px dotted #778CA2;
            }
        }
        .leaf-title {
            margin-left: 10px;
        }
    }
}
</style>
