import {EDIT_MODAL} from 'actions/power_manage/power/edit_modal';

/*
* 初始化state
 */

const initState = {
    visible: false,
    is_edit:false,
    visible_detail: false,
    params:{

    }
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case EDIT_MODAL:
            let params=action.params
            return {
                state,
                ...params,
                is_edit:params.is_edit || false
            }; 
        default:
            return state
    }
}