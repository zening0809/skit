/**
 * Action Types
 */

//This is an example. Add your action types below.
export const ACTION_SOME = 'ACTION_SOME';

// table获取数据
export const ACTION_TABLE_DATA = 'ACTION_TABLE_DATA';
// modal状态
export const ACTION_MODAL_STATUS = 'ACTION_MODAL_STATUS';
// modal状态
export const ACTION_CUSTOMER_EDIT_FORM = 'ACTION_CUSTOMER_EDIT_FORM';

/**
 * Action Creators
 */

//This is an example. Add your action creators below.
export const addSomeAction = param => {
    return {
        type: ACTION_SOME,
        param
    }
};

//
export const modalStatusAction = param => {
    return {
        type: ACTION_MODAL_STATUS,
        param: param
    }
};

export const customerEditFormAction = param => {
    return {
        type: ACTION_CUSTOMER_EDIT_FORM,
        param: param
    }
};