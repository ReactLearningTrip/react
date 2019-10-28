import {combineReducers} from "redux";

import left_menu from 'reducers/left_menu/menu';

import power_edit_modal from 'reducers/power_manage/power/edit_modal';
import power_list from 'reducers/power_manage/power/list';
import user_edit_modal from 'reducers/power_manage/user/edit_modal';
import user_list from 'reducers/power_manage/user/list';
import role_edit_modal from 'reducers/power_manage/role/edit_modal';
import role_list from 'reducers/power_manage/role/list';

export default combineReducers({
    left_menu,

    power_edit_modal,
    power_list,
    user_edit_modal,
    user_list,
    role_edit_modal,
    role_list,
    

    
});