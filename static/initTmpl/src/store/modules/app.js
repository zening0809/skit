import router from '@/router'
import staticRoutes from '@/router/static'
import { merge } from '@/store/helper'

/**
 * 获取路由数据
 * @param {Array} menus
 */
function getRoutes (menus) {
    const routeArr = []
    const routeMap = {}

    function convert (data) {
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].children && data[i].children.length) {
                convert(data[i].children)
            } else if (data[i].path) {
                const route = {
                    path: data[i].path,
                    meta: _.pick(data[i], ['id', 'code', 'moduleName', 'parentCodes']),
                    component: () => import('@/modules' + data[i].path + '/index.vue')
                }
                routeArr.push(route)
                routeMap[data[i].code] = route
            }
        }
    }

    convert(menus)
    staticRoutes.forEach(item => {
        routeArr.push(item)
        routeMap[item.meta.code] = item
    })
    return {
        routeArr,
        routeMap
    }
}

/**
 * 格式化后台返回的菜单数据
 * @param {Array} menus
 */
function formatMenu (menus) {
    const res = []
    for (let i = 0; i < menus.length; i++) {
        res.push({
            id: menus[i].id,
            code: menus[i].code,
            level: menus[i].level,
            moduleName: menus[i].name,
            path: menus[i].url,
            parentId: menus[i].parentId,
            icon: menus[i].icon
        })
    }
    return res
}

/**
 * 将菜单数据转换成树形结构
 * @param {Array} menus
 */
function menuToTree (menus) {
    // 获取顶层菜单
    const topMenus = []
    menus.forEach(item => {
        if (!item.parentId) {
            item.isTop = true
            topMenus.push(item)
        }
    })
    function convert (data, parent) {
        parent.children = parent.children || []
        for (let i = 0; i < data.length; i++) {
            if (data[i].parentId === parent.id) {
                data[i].parentCodes = [...(parent.parentCodes || []), parent.code]
                parent.children.push(data[i])
                convert(data, data[i])
            }
        }
    }
    for (let i = 0; i < topMenus.length; i++) {
        convert(menus, topMenus[i])
    }
    return topMenus
}

const DEFAULTS = {
    // 侧边栏是否折叠
    fold: false,
    // 所有菜单
    allMenus: [],
    // 侧边栏菜单
    sdMenus: [],
    // 快捷菜单
    quickMenus: [],
    // 路由Array
    routeArr: [],
    // 路由Map
    routeMap: {},
    // 当前用户信息
    user: {},
    // 导航页签
    navTabs: [],
    // 当前激活页签
    actTab: null,
    // 当前页面是前进还是后退
    isBack: false,
    // 视图相关
    view: { width: null, height: null },
    // 登录用户拥有的资源码
    rcMap: {}
}

/**
 * 全局状态管理
 */
export default merge({
    namespaced: true,
    mutations: {
        // 激活导航页签
        actNavTab (state, { code, query }) {
            if (!code || state.actTab === code) {
                return
            }
            if (!state.navTabs.length && code !== CNST.ROUTES.ROOT.meta.code) {
                state.navTabs.push({ ...CNST.ROUTES.ROOT.meta })
            }
            const indexO = _.findIndex(state.navTabs, function (item) {
                return item.code === state.actTab
            })
            const indexN = _.findIndex(state.navTabs, function (item) {
                return item.code === code
            })
            if (indexN === -1) {
                state.navTabs.push({
                    ...state.routeMap[code].meta,
                    query
                })
                state.isBack = false
            } else {
                state.isBack = indexN < indexO
                if (query) {
                    state.navTabs[indexN].query = query
                } else {
                    query = state.navTabs[indexN].query
                }
            }
            state.actTab = code
            router.push({
                path: state.routeMap[code].path,
                query
            })
        },
        // 删除单个导航页签
        delNavTab (state, { code }) {
            const index = _.findIndex(state.navTabs, function (item) {
                return item.code === code
            })
            if (index === -1) {
                return
            }
            state.navTabs.splice(index, 1)
            if (!state.navTabs.length) {
                state.actTab = null
                router.push({ path: CNST.ROUTES.ROOT.path })
            } else if (state.actTab === code) {
                const actIndex = state.navTabs[index] ? index : (index - 1)
                router.push({ path: state.routeMap[state.navTabs[actIndex].code].path })
            }
        },
        // 删除所有导航页签
        delAllNavTabs (state) {
            state.actTab = null
            state.navTabs = []
            router.push('/')
        }
    },
    actions: {
        // 查询用户菜单
        async 'queryUserMenu' ({ commit }) {
            const { code, data } = {
                code: 200,
                data: [
                    { id: '01', code: '01', level: 1, name: '机构与用户管理' },
                    { id: '01-01', parentId: '01', code: '01-01', level: 2, name: '机构管理', icon: 'el-icon-help' },
                    { id: '01-01-01', parentId: '01-01', code: '01-01-01', level: 3, name: '机构管理', url: '/organizations' },
                    { id: '01-02', parentId: '01', code: '01-02', level: 2, name: '用户管理', icon: 'el-icon-help' },
                    { id: '01-02-01', parentId: '01-02', code: '01-02-01', level: 3, name: '用户管理', url: '/users' },

                    { id: '02', code: '02', level: 1, name: '分配系统操作权限' },
                    { id: '02-01', parentId: '02', code: '02-01', level: 2, name: '菜单管理', icon: 'el-icon-help' },
                    { id: '02-01-01', parentId: '02-01', code: '02-01-01', level: 3, name: '菜单资源管理', url: '/menuResource' },
                    { id: '02-01-02', parentId: '02-01', code: '02-01-02', level: 3, name: '菜单角色管理', url: '/menuRole' },
                    { id: '02-02', parentId: '02', code: '01-02', level: 2, name: '数据管理', icon: 'el-icon-help' },
                    { id: '02-02-01', parentId: '02-02', code: '02-02-01', level: 3, name: '数据类型管理', url: '/dataType' },
                    { id: '02-02-02', parentId: '02-02', code: '02-02-02', level: 3, name: '数据资源管理', url: '/dataResource' },
                    { id: '02-02-03', parentId: '02-02', code: '02-02-03', level: 3, name: '数据角色管理', url: '/dataRole' },

                    { id: '03', code: '03', level: 1, name: '分配管理权限' },
                    { id: '03-01', parentId: '03', code: '03-01', level: 2, name: '资源管理权限', icon: 'el-icon-help' },
                    { id: '03-01-01', parentId: '03-01', code: '03-01-01', level: 3, name: '我的菜单资源管理权限', url: '/menuPermissions' },
                    { id: '03-01-02', parentId: '03-01', code: '03-01-02', level: 3, name: '我的菜单角色管理权限', url: '/rolePermissions' },
                    { id: '03-02', parentId: '03', code: '03-02', level: 2, name: '角色管理权限', icon: 'el-icon-help' },
                    { id: '03-02-01', parentId: '03-02', code: '03-02-01', level: 3, name: '菜单角色管理权限', url: '/menuRolePermissions' },
                    { id: '03-02-02', parentId: '03-02', code: '03-02-02', level: 3, name: '数据角色管理权限', url: '/dataRolePermissions' },
                    { id: '03-03', parentId: '03', code: '03-03', level: 2, name: '机构管理权限', icon: 'el-icon-help' },
                    { id: '03-03-01', parentId: '03-03', code: '03-03-01', level: 3, name: '我的机构管理权限', url: '/organizationsPermissions' },
                    { id: '03-04', parentId: '03', code: '03-04', level: 2, name: '分配管理权限', icon: 'el-icon-help' },
                    { id: '03-04-01', parentId: '03-04', code: '03-04-01', level: 3, name: '给管理员授权', url: '/administrators' },

                    { id: '04', code: '04', level: 1, name: '平台管理' },
                    { id: '04-01', parentId: '04', code: '04-01', level: 2, name: '平台管理', icon: 'el-icon-help' },
                    { id: '04-01-01', parentId: '04-01', code: '04-01-01-01', level: 3, name: '应用管理', url: '/apps' },
                    { id: '04-01-02', parentId: '04-01', code: '04-01-02', level: 3, name: '平台管理员', url: '/usfAdmin' },
                    { id: '04-01-03', parentId: '04-01', code: '04-01-03', level: 3, name: 'USF菜单资源管理', url: '/usfMenuResource' }
                ]
            }
            if (code === 200) {
                if (!_.isArray(data) || !data.length) {
                    return
                }
                // 格式化菜单数据
                let menus = formatMenu(data)
                // 将菜单数据转换成树形结构
                menus = menuToTree(menus)
                // 将菜单转换成路由数据
                let { routeArr, routeMap } = getRoutes(menus)
                // 动态添加路由
                router.addRoutes(routeArr)
                routeArr = router.options.routes.concat(routeArr)
                commit('update', { allMenus: menus, routeArr, routeMap })
            }
        }
    }
}, DEFAULTS)
