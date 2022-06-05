import request from '@/utils/request'

export function getBrandList(start, limit, data) {
  return request({
    url: `/lejuAdmin/brand/findBrandByPage/${start}/${limit}`,
    method: 'get',
    data
  })
}

export function switchShowStatus(data) {
  return request({
    url: `/lejuAdmin/brand/switchShowStatus`,
    method: 'post',
    data
  })
}

export function updateBrand(data) {
  return request({
    url: `/lejuAdmin/brand/updateBrand`,
    method: 'post',
    data
  })
}

export function addBrand(data) {
  return request({
    url: `/lejuAdmin/brand/addBrand`,
    method: 'post',
    data
  })
}

export function deleteBrand(id, data) {
  return request({
    url: `/lejuAdmin/brand/delBrand/${id}`,
    method: 'delete',
    data
  })
}

