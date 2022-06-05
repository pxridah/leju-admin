import request from '@/utils/request'

export function doLogin(data) {
  return request({
    url: '/lejuAdmin/index/login',
    method: 'post',
    data
  })
}

export function getInitMenus(data) {
  return request({
    url: `/admin/sysAuth/index/getInitMenus`,
    method: 'get',
    data
  })
}

