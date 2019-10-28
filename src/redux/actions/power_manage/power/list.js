export const GET_USER_INFO_REQUEST = "power/GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS = "power/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "power/GET_USER_INFO_FAIL";
export const GET_USER_INFO_REQUEST_DETAIL = "power/GET_USER_INFO_REQUEST_DETAIL";
export const GET_USER_INFO_SUCCESS_DETAIL = "power/GET_USER_INFO_SUCCESS_DETAIL";
export const GET_USER_INFO_FAIL_DETAIL = "power/GET_USER_INFO_FAIL_DETAIL";

export function list_fn(params) {
    return {
      types: [GET_USER_INFO_REQUEST, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL],
      params,
      promise: client => client.post(`/role/getList`,params)
    }
}
export function list_detail_fn(params) {
  return {
    types: [GET_USER_INFO_REQUEST_DETAIL, GET_USER_INFO_SUCCESS_DETAIL, GET_USER_INFO_FAIL_DETAIL],
    promise: client => client.get('/role/getRoleById?'+params.id)
  }
}