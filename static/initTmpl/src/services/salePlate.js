/**
 * 销售平台相关接口
 */
const config = {
    prefix: '/sp',
    items: [
        // 新增
        { key: 'add', url: '/add' },
        // 更新
        { key: 'update', url: '/update' },
        // 根据id查询实体对象
        { key: 'queryById', url: '/getById', method: 'get' },
        // 查询分页列表
        { key: 'queryPage', url: '/queryPage' }
    ]
}

export default req.generate(config)
