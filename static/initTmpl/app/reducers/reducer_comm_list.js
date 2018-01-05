/**
 * Sub Reducers
 * select列表数据
 */

import { COMM_LIST_URL } from '../api/config';

const reducerCommList = (state = {}, action) => {
    switch (action.type) {
        case COMM_LIST_URL:
            return Object.assign({}, action.data);
        default:
            return state;
    }
}

export default reducerCommList;