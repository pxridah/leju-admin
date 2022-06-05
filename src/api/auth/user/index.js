import request from '@/utils/request'

export function getUserList(start, limit, data) {
  return request({
    url: `/admin/sysAuth/user/findUsersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}

export function getAllRoles(start, limit, data) {
  return request({
    url: `/admin/sysAuth/role/findAllRoles`,
    method: 'get',
    data
  })
}

export function saveUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/saveUserRoles`,
    method: 'post',
    data
  })
}

export function getUserDetail(id, data) {
  return request({
    url: `/admin/sysAuth/user/${id}`,
    method: 'get',
    data
  })
}

export function updateUserRoles(data) {
  return request({
    url: `/admin/sysAuth/user/updateUserRoles`,
    method: 'put',
    data
  })
}

export function removeUser(id, data) {
  return request({
    url: `/admin/sysAuth/user/removeUser/${id}`,
    method: 'delete',
    data
  })
}

