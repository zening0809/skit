import axios from 'axios'

const CONTENT_TYPES = {
    1: 'application/json',
    2: 'multipart/form-data',
    3: 'application/x-www-form-urlencoded'
}

// 缓存正在请求的ajax
const pendings = []

// 设置默认请求地址前缀
axios.defaults.baseURL = process.env.VUE_APP_API_PREFIX

export function ajax (method = 'post', url, options) {
    const key = `${method} ${url} ${JSON.stringify(options.data)}`
    for (let i = 0, len = pendings.length; i < len; i++) {
        if (pendings[i] === key) {
            return Promise.resolve({
                code: -1,
                msg: '操作太频繁，请稍后再试'
            })
        }
    }
    pendings.push(key)
    options.data = options.data || {}
    const opts = {
        url,
        method,
        headers: {
            'Content-type': CONTENT_TYPES[options.cType || '1']
        }
    }
    if (method === 'get') {
        opts.params = options.data
    } else {
        opts.data = options.data
    }
    return axios(opts).then(function ({ data }) {
        return data
    }).catch(function (error) {
        return {
            code: '-1',
            msg: error.message
        }
    }).finally(function () {
        setTimeout(function () {
            for (let i = 0, len = pendings.length; i < len; i++) {
                if (pendings[i] === key) {
                    pendings.splice(i, 1)
                    break
                }
            }
        }, 500)
    })
}

export function generate (config) {
    const map = {}
    const items = config.items
    for (let i = 0, len = items.length; i < len; i++) {
        map[items[i].key] = function (data) {
            return ajax(
                items[i].method,
                (items[i].prefix || config.prefix || '') + items[i].url,
                { data, ...(_.omit(items[i], ['key', 'url', 'method', 'prefix']) || {}) }
            )
        }
    }
    return map
}
