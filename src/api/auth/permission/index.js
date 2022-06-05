import request from '@/utils/request'

export function getAllPermissions(data) {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`,
    method: 'get',
    data
  })
}

export function saveInitMenus(data) {
  return request({
    url: `/admin/sysAuth/permission/saveInitMenus`,
    method: 'post',
    data
  })
}

export function savePermission(data) {
  return request({
    url: `/admin/sysAuth/permission/save`,
    method: 'post',
    data
  })
}

export function removePermission(id, data) {
  return request({
    url: `/admin/sysAuth/permission/remove/${id}`,
    method: 'delete',
    data
  })
}
