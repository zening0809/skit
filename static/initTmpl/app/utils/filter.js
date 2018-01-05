export default {
    dataFilter(dataList, searchObj) {
        let curSelectArr = [];
        if (Object.keys(dataList).length <= 0) {
            return;
        }
        searchObj.forEach((item) => {
            // 进行类型判断
            if (item.type == 'select') {
                // 进行字符串判断
                curSelectArr = dataList[item['name']]
                if (typeof curSelectArr[0] === 'string') {
                    curSelectArr.forEach((strItem) => {
                        item.data.push({
                            id: strItem,
                            name: strItem
                        })
                    })
                } else {
                    item.data = curSelectArr;
                }
                item.data.unshift({
                    id: 'all',
                    name: '全部'
                });
                return;
            }
        })
    }
}