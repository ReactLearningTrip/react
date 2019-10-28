import {EDIT_MENU} from 'actions/left_menu/menu';

/*
* 初始化state
 */

const initState = {
        all_tabs: [
            { title: 'tab1', content: '', key: '1' ,path:'/power_manage/user'},
            { title: 'tab2', content:'', key: '2' ,path:'/power_manage/role'},
            { title: 'tab3', content: '', key: '3' ,path:'/power_manage/power'},
        ],
        all_power_tabs: [
            { title: 'tab1', content: '', key: '1' ,path:'/power_manage/user'},
            { title: 'tab2', content:'', key: '2' ,path:'/power_manage/role'},
            { title: 'tab3', content: '', key: '3' ,path:'/power_manage/power'}
        ],
        show_tabs:[],
        activeKey:''
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case EDIT_MENU:
            let params=action.params
            return {
                ...state,
                ...params
            }; 
        default:
            return state
    }
}