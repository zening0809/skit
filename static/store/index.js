import { pageListMerge, generateActions } from '@/store/helper'
import actionMap from './actionMap'

const DEFAULTS = {
}

export default pageListMerge({
  namespaced: true,
  actions: {
    ...generateActions(actionMap)
  },
  mutations: {
  }
}, DEFAULTS)
