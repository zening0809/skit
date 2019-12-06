/**
 * 通用组件接口文档
 */
const config = {
    prefix: '/component',
    items: [
        // 新增自定义列
        { key: 'addCustomColumn', url: '/addComponentRow' },
        // 更新自定义列
        { key: 'updateCustomColumn', url: '/updateComponentRow' },
        // 获取自定义列详情
        { key: 'queryCustomColumnDetail', url: '/getComponentRow' },
        // 新增自定义查询
        { key: 'addCustomSearch', url: '/addComponentSearch' },
        // 删除自定义查询
        { key: 'delCustomSearch', url: '/deleteComponentSearch' },
        // 更新自定义查询
        { key: 'updateCustomSearch', url: '/updateComponentSearch' },
        // 获取自定义查询列表
        { key: 'queryCustomSearchList', url: '/getComponentSearch' }
    ]
}

export default req.generate(config)
