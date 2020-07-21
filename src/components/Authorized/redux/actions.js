import { GET_USER_INFO, GET_USER_MENU } from './constants'
import { getMenu, getInfo } from '@api/acl/login'

function GetUserInfoSync(data) {
  return { type: GET_USER_INFO, data }
}

export function getUserInfo() {
  return dispatch => {
    return getInfo().then(res => {
      dispatch(GetUserInfoSync(res))
    })
  }
}


function GetUserMenuSync(data) {
  return { type: GET_USER_MENU, data }
}

export function getUserMenu() {
  return dispatch => {
    return getMenu().then(res => {
      dispatch(GetUserMenuSync(res.permissionList))
      return res
    })
  }
}