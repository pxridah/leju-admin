import request from '@/utils/request'

export function getAllRoles(start, limit, data) {
  return request({
    url: `/admin/sysAuth/role/findRolesByPage/${start}/${limit}`,
    method: 'get',
    data
  })
}

export function getAllPermissions(data) {
  return request({
    url: `/admin/sysAuth/permission/findAllPermissions`,
    method: 'get',
    data
  })
}

export function saveRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/saveRolePermissions`,
    method: 'post',
    data
  })
}
export function getRolePermissions(id, data) {
  return request({
    url: `/admin/sysAuth/role/findRolePermissions/${id}`,
    method: 'get',
    data
  })
}
export function updateRolePermissions(data) {
  return request({
    url: `/admin/sysAuth/role/updateRolePermissions`,
    method: 'put',
    data
  })
}

export function removeRole(id, data) {
  return request({
    url: `/admin/sysAuth/role/removeRole/${id}`,
    method: 'delete',
    data
  })
}
