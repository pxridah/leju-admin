import request from '@/utils/request'

export function getProductList(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
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

export function addRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/addRecommend`,
    method: 'post',
    data
  })
}

