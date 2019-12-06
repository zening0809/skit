import Store from 'web-storage-cache'

const store = {
    ls: new Store({ storage: 'localStorage' }),
    ss: new Store({ storage: 'sessionStorage' })
}

const date = {
    format (date, format) {
        if (!date) {
            return
        }
        date = date + ''
        if (date.length === 10) {
            date = parseInt(date) * 1000
        } else {
            date = parseInt(date)
        }
        date = new Date(date)
        if (!format) {
            format = 'yyyy-MM-dd hh:mm:ss'
        }
        const map = {
            'M': date.getMonth() + 1,
            'd': date.getDate(),
            'h': date.getHours(),
            'm': date.getMinutes(),
            's': date.getSeconds(),
            'q': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        }
        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            let v = map[t]
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v
                    v = v.substr(v.length - 2)
                }
                return v
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length)
            }
            return all
        })
        return format
    }
}

const object = {
    removeEmptyAttr (obj) {
        if (_.isObject(obj)) {
            for (let key in obj) {
                if (_.isObject(obj[key]) || _.isArray(obj[key])) {
                    object.removeEmptyAttr(obj[key])
                } else {
                    if (_.isUndefined(obj[key]) || _.isNull(obj[key]) || (_.isString(obj[key]) && _.trim(obj[key]) === '')) {
                        delete obj[key]
                    }
                }
            }
        } else if (_.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                object.removeEmptyAttr(obj[i])
            }
        }
    }
}

const tree = {
    /**
     * 获取所有叶子节点
     * @param {Array} data 树状数据
     * @param {String} children 子节点对应属性名
     * @param {Array} result 返回结果
     */
    getAllLeaves (data, children = 'children', result = []) {
        if (data && data.length) {
            data.forEach(item => {
                if (item[children] && item[children].length) {
                    tree.getAllLeaves(item[children], children, result)
                } else {
                    result.push(item)
                }
            })
        }
        return result
    }
}

export {
    store,
    date,
    object,
    tree
}
