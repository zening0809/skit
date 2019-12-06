/**
 * 数据字典相关接口
 */
const config = {
    prefix: '/dictionary',
    items: [
        // 新增
        { key: 'add', url: '/add' },
        // 删除
        { key: 'delete', url: '/delete' },
        // 更新
        { key: 'update', url: '/update' },
        // 查询分页列表
        { key: 'queryPage', url: '/queryPage' },
        // 根据字典类型查询字典列表
        { key: 'queryDictByType', url: '/getDictValue' }
    ]
}

export default req.generate(config)
