import request from '@/utils/request'

export function getOrderDetail(orderId, data) {
  return request({
    url: `/lejuAdmin/order/orderDetail/${orderId}`,
    method: 'get',
    data
  })
}
export function sendDone(data) {
  return request({
    url: `/lejuAdmin/order/sendDone`,
    method: 'post',
    data
  })
}

