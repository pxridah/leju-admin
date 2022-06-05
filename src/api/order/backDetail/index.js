import request from '@/utils/request'

export function getOrderReturn(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/${id}`,
    method: 'get',
    data
  })
}

export function agreeApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
    method: 'post',
    data
  })
}

export function rejectApply(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/rejectApply/{id}`,
    method: 'post',
    data
  })
}

export function receiveProduct(id, data) {
  return request({
    url: `/lejuAdmin/orderReturn/receiveProduct/{id}`,
    method: 'post',
    data
  })
}

