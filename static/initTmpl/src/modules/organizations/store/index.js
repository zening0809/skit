import { pageListMerge, generateActions } from '@/store/helper'

// 默认状态
const DEFAULTS = {
    entity: {}
}

export default pageListMerge({
    namespaced: true,
    actions: {
        ...generateActions({
            caller: api.dict,
            items: [
                { key: 'createEntity', callee: 'add' },
                { key: 'deleteEntity', callee: 'delete' },
                { key: 'updateEntity', callee: 'update' }
            ]
        }),
        async 'queryList' ({ commit, state }) {
            commit('update', { loading: true })
            const { code, msg, data } = await api.dict.queryPage({
                data: {
                    ...state.query,
                    dataType: 1
                },
                page: {
                    pageIndex: state.pageIndex + 1,
                    pageSize: state.pageSize
                }
            })
            const payload = { loading: false }
            if (code === 200) {
                const rows = _.get(data, 'rows') || []
                rows.forEach(row => {
                    row.children = []
                    row.hasChildren = true
                })
                // const typeArr = []
                // const typeMap = {}
                // const items = []
                // for (let i = 0, len = rows.length; i < len; i++) {
                //     if (rows[i].dataType === 1) {
                //         rows[i].hasChildren = true
                //         typeArr.push(rows[i])
                //         typeMap[rows[i].paramTypeCode] = []
                //     } else {
                //         items.push(rows[i])
                //     }
                // }
                // for (let i = 0, len = items.length; i < len; i++) {
                //     if (typeMap[items[i].paramTypeCode]) {
                //         typeMap[items[i].paramTypeCode].push(items[i])
                //     } else {
                //         typeArr.push(items[i])
                //     }
                // }
                // for (let i = 0, len = typeArr.length; i < len; i++) {
                //     typeArr[i].children = typeMap[typeArr[i].paramTypeCode]
                // }
                payload.list = rows
                payload.total = _.get(data, 'rowTotal') || 0
            } else {
                this._vm.$message.error(msg)
            }
            commit('update', payload)
        }
    }
}, DEFAULTS)
