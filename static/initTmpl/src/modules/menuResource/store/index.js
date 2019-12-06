import { pageListMerge, generateActions } from '@/store/helper'

// 默认状态
const DEFAULTS = {
    entity: {}
}

export default pageListMerge({
    namespaced: true,
    actions: {
        ...generateActions({
            caller: api.goods,
            items: [
                { key: 'createEntity', callee: 'addBrand' },
                { key: 'updateEntity', callee: 'updateBrand' },
                { key: 'queryList', callee: 'queryBrands' },
                { key: 'start', callee: 'startBrands' },
                { key: 'stop', callee: 'stopBrands' },
                { key: 'delete', callee: 'deleteBrands' }
            ]
        })
    }
})
