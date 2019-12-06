/**
 * 计量单位相关接口
 */
const config = {
    prefix: '/unit',
    items: [
        // 新增
        { key: 'add', url: '/add' },
        // 删除
        { key: 'delete', url: '/delete' },
        // 更新
        { key: 'update', url: '/update' },
        // 查询分页列表
        { key: 'queryPage', url: '/queryPage' }
    ]
}

export default req.generate(config)
