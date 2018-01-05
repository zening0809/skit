/**
 * Sub Reducers
 * select列表数据
 */

import { CUSTOMER_LIST_URL } from '../api/config';

const reducerCustomerList = (state = {}, action) => {
    switch (action.type) {
        case CUSTOMER_LIST_URL:
            return Object.assign({}, action.data);
        default:
            return state;
    }
}

export default reducerCustomerList;