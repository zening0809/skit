/**
 * 数据字典相关接口
 */
const config = {
    prefix: '/select',
    items: [
        // 查询枚举
        { key: 'queryDicts', url: '/getMultiDictOption' }
    ]
}

export default req.generate(config)
