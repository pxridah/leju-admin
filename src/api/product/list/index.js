import request from '@/utils/request'

export function getProductList(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}

export function switchNewStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchNewStatus`,
    method: 'post',
    data
  })
}

export function switchRecommandStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchRecommandStatus`,
    method: 'post',
    data
  })
}
export function switchPublishStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchPublishStatus`,
    method: 'post',
    data
  })
}
export function switchVerifyStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchVerifyStatus`,
    method: 'post',
    data
  })
}

export function getSkusByProductId(productId, data) {
  return request({
    url: `/lejuAdmin/sku/getSkusByProductId/${productId}`,
    method: 'get',
    data
  })
}

export function updateSkuInfo(data) {
  return request({
    url: `/lejuAdmin/sku/updateSkuInfo`,
    method: 'post',
    data
  })
}
export function addProductSkus(data) {
  return request({
    url: `/lejuAdmin/sku/addProductSkus`,
    method: 'post',
    data
  })
}
export function deleteSku(skuId, data) {
  return request({
    url: `/lejuAdmin/sku/delSku/${skuId}`,
    method: 'delete',
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
export function deleteProduct(productId, data) {
  return request({
    url: `/lejuAdmin/product/del/${productId}`,
    method: 'delete',
    data
  })
}

