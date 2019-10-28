import {GET_USER_INFO_REQUEST,GET_USER_INFO_SUCCESS,GET_USER_INFO_FAIL,
        GET_USER_INFO_REQUEST_DETAIL, GET_USER_INFO_SUCCESS_DETAIL, GET_USER_INFO_FAIL_DETAIL
      } from 'actions/power_manage/role/list';

/*
* 初始化state
 */

const initState = {
      isLoading: false,
      params:{},
      userInfo: {},
      userInfo_detail:{},
      errorMsg: ''
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    let params=action.params;
    switch (action.type) {
      case GET_USER_INFO_REQUEST:
          return {
              ...state,
              isLoading: true,
              params:params,
              errorMsg: ''
          };
      case GET_USER_INFO_SUCCESS:
          return {
              ...state,
              isLoading: false,
              userInfo: action.result.content,
              errorMsg: ''
          };
      case GET_USER_INFO_FAIL:
          return {
              ...state,
              isLoading: false,
              userInfo: {},
              errorMsg: '请求错误'
          };
       case GET_USER_INFO_REQUEST_DETAIL:
          return {
              ...state,
              userInfo_detail: {}
          };
      case GET_USER_INFO_SUCCESS_DETAIL:
          return {
              ...state,
              userInfo_detail: action.result.content
          };
      case GET_USER_INFO_FAIL_DETAIL:
          return {
              ...state,
              userInfo_detail:{}
          };   
        default:
            return state
    }
}