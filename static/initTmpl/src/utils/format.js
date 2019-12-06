/**
 * 获取叶子节点
 * @param {object} tree 树状数据
 * @param {string} [property='children'] property 子属性数据key
 * @param {array} result 返回数据
 */
export const getTreeLeaf = (tree, property = 'children', result = []) => {
    if (tree instanceof Array) {
        tree.forEach(inner => {
            if (inner[property] instanceof Array && inner[property].length) {
                getTreeLeaf(inner[property], property, result)
            } else {
                result.push(inner)
            }
        })
    } else if (typeof tree === 'object') {
        if (inner[property] instanceof Array && inner[property].length) {
            getTreeLeaf(inner[property], property, result)
        } else {
            result.push(tree)
        }
    } else {
        console.log('其他数据类型:', tree)
    }
    return result
}