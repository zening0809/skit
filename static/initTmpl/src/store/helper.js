/**
 * module对象合并
 * @param {Array|Object} sps 需要合并的父对象
 * @param {Object} overrides 一些新增的属性和方法
 * @param {Object} defaults 默认状态
 */
export function merge (sps, overrides, defaults) {
    if (arguments.length === 0) {
        return {}
    }
    if (arguments.length === 1) {
        overrides = sps
        sps = []
    } else if (arguments.length === 2) {
        defaults = overrides
        overrides = sps
        sps = []
    } else if (arguments.length === 3) {
        if (!_.isArray(sps)) {
            sps = [sps]
        }
    }
    let sb = {}
    if (defaults) {
        // 添加默认state
        sb.state = function () {
            return _.cloneDeep(defaults)
        }
        // 默认添加reset|update函数
        sb.mutations = {
            reset (state, payload) {
                if (_.isEmpty(payload) || _.isObject(payload)) {
                    Object.assign(state, { ..._.cloneDeep(defaults), ...(payload || {}) })
                } else if (_.isArray(payload)) {
                    for (let i = 0; i < payload.length; i++) {
                        state[payload[i]] = _.cloneDeep(defaults[payload[i]])
                    }
                } else if (_.isString(payload)) {
                    state[payload] = _.cloneDeep(defaults[payload])
                }
            },
            update (state, payload) {
                if (_.isArray(payload)) {
                    for (let i = 0; i < payload.length; i++) {
                        state[payload[i]] = _.cloneDeep(defaults[payload[i]])
                    }
                } else if (_.isString(payload)) {
                    state[payload] = _.cloneDeep(defaults[payload])
                } else if (_.isObject(payload)) {
                    Object.assign(state, payload)
                }
            }
        }
    }
    sps.push(overrides)
    return _.merge(sb, ...sps)
}

/**
 * 列表页module合并
 * @param {Array|Object} sps 需要合并的父对象
 * @param {Object} overrides 一些新增的属性和方法
 * @param {Object} defaults 默认状态
 */
export function pageListMerge (sps, overrides, defaults) {
    if (arguments.length === 2) {
        defaults = overrides
    }
    defaults = {
        // 加载状态
        loading: false,
        // 查询条件
        query: {},
        // 当前页码
        pageIndex: 0,
        // 每页展示条数
        pageSize: 10,
        // 总条数
        total: 0,
        // 列表数据
        list: [],
        ...defaults
    }
    return merge(sps, overrides, defaults)
}

/**
 * 辅助生产增|删|改|查等通用action
 * @param {Object} config
 */
export function generateActions (config) {
    const actions = {}
    const items = config.items
    for (let i = 0, len = items.length; i < len; i++) {
        items[i].wrapByData = items[i].wrapByData !== false ? true : false
        switch (items[i].key) {
            case 'queryEntity':
                actions.queryEntity = async function ({ dispatch, commit }, { params, done, fail }) {
                    if (items[i].wrapByData) {
                        params = { data: params }
                    }
                    const { code, msg, data } = await (items[i].caller || config.caller)[items[i].callee](params)
                    if (code === 200) {
                        commit('update', { entity: data || {} })
                        done && done()
                        items.done && items.done({ dispatch, commit })
                    } else {
                        this._vm.$message.error(msg)
                        fail && fail()
                        items.fail && items.fail({ dispatch, commit })
                    }
                }
                break
            case 'queryList':
                actions.queryList = async function ({ commit, state }) {
                    commit('update', { loading: true })
                    const { code, msg, data } = await (items[i].caller || config.caller)[items[i].callee]({
                        data: {
                            ...state.query
                        },
                        page: {
                            pageIndex: state.pageIndex,
                            pageSize: state.pageSize
                        }
                    })
                    const payload = { loading: false }
                    if (code === 200) {
                        payload.list = _.get(data, 'rows') || []
                        payload.total = _.get(data, 'rowTotal') || 0
                    } else {
                        this._vm.$message.error(msg)
                    }
                    commit('update', payload)
                }
                break
            default:
                actions[items[i].key] = async function ({ dispatch, commit }, { params, done, fail }) {
                    if (items[i].wrapByData) {
                        params = { data: params }
                    }
                    const { code, msg, data } = await (items[i].caller || config.caller)[items[i].callee](params)
                    if (code === 200) {
                        if (items[i].showMsg !== false) {
                            this._vm.$message.success(msg)
                        }
                        if (items[i].mutation) {
                            commit(items[i].mutation, data)
                        }
                        done && done()
                        items.done && items.done({ dispatch, commit })
                    } else {
                        if (items[i].showMsg !== false) {
                            this._vm.$message.error(msg)
                        }
                        fail && fail()
                        items.fail && items.fail({ dispatch, commit })
                    }
                }
        }
    }
    return actions
}
