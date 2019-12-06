let uid = 1

function genUid () {
    return 'sr-' + uid++
}

/**
 * meta: { closable: 是否可关闭, showsSd: 是否显示侧边栏 }
 */
const ROUTES = {
    ROOT: {
        path: '/',
        meta: { id: genUid(), code: genUid(), moduleName: '首页', closable: false, showSd: false },
        component: () => import('@/modules/home')
    }
}

export default ROUTES
