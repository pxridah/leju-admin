import request from '@/utils/request'

export function getAddressList(data) {
  return request({
    url: `/lejuAdmin/companyAddress/addressList`,
    method: 'get',
    data
  })
}
export function setSendOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setSendOne`,
    method: 'post',
    data
  })
}
export function setReceiveOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setReceiveOne`,
    method: 'post',
    data
  })
}

export function saveAddress(data) {
  return request({
    url: `/lejuAdmin/companyAddress/save`,
    method: 'post',
    data
  })
}
export function updateAddress(data) {
  return request({
    url: `/lejuAdmin/companyAddress/update`,
    method: 'post',
    data
  })
}

export function deleteAddress(id, data) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'delete',
    data
  })
}
export function getAddress(id, data) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'get',
    data
  })
}

