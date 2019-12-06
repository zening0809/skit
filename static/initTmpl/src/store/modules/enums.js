import { merge } from '../helper'

const ENUM_TYPES = [
    'DataTypeEnum'
]

let DEFAULTS = {

}

for (let i = 0, len = ENUM_TYPES.length; i < len; i++) {
    DEFAULTS[ENUM_TYPES[i]] = { array: [], map: {} }
}

/**
 * 枚举值管理
 */
export default merge ({
    namespaced: true,
    actions: {
        async 'queryEnums' ({ commit, state }, enumTypes = []) {
            if (_.isString(enumTypes)) {
                enumTypes = [enumTypes]
            }
            enumTypes = enumTypes.filter(function (item) {
                return _.isEmpty(state[item].array)
            })
            if (_.isEmpty(enumTypes)) {
                return
            }
            const { code, msg, data } = await api.select.queryDicts({ data: enumTypes })
            if (code === 200) {
                const payload = {}
                for (let key in data) {
                    const array = data[key]
                    if (!array) {
                        continue
                    }
                    const map = {}
                    for (let i = 0, len = array.length; i < len; i++) {
                        map[array[i].code] = array[i]
                    }
                    payload[key] = { array, map }
                }
                commit('update', payload)
            } else {
                this._vm.$message.error(msg)
            }
        }
    }
}, DEFAULTS)
