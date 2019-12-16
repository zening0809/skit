import { pageListMerge, generateActions } from '@/store/helper'

const DEFAULTS = {
  tableData: [],
  total: 0
}

export default pageListMerge({
  namespaced: true,
  actions: {
    ...generateActions({
      caller: api.testList,
      items: [
        { key: 'queryTest', callee: 'bbbbbb', mutation: 'testList' }
      ]
    })
  },
  mutations: {
    testList(state, content) {
      state.tableData = content.rows
      state.total = content.total
    }
  }
}, DEFAULTS)
