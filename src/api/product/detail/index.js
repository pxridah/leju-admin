import request from '@/utils/request'

export function getProductSkusDetail(productId, data) {
  return request({
    url: `/lejuAdmin/product/productSkusDetail/${productId}`,
    method: 'get',
    data
  })
}

export function getAllBrands(data) {
  return request({
    url: `/lejuAdmin/brand/findAllBrand`,
    method: 'get',
    data
  })
}

export function getAllCategory(data) {
  return request({
    url: `/lejuAdmin/category/getAllCategory`,
    method: 'get',
    data
  })
}

export function updateProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/updateProductAndSkus`,
    method: 'post',
    data
  })
}
export function addProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data
  })
}

