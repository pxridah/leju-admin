import request from '@/utils/request'

export function uploadFileOss(data) {
  return request({
    url: `/lejuAdmin/material/uploadFileOss`,
    method: 'post',
    data
  })
}

export function addArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/addArticle`,
    method: 'post',
    data
  })
}
export function updateArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/updateArticle`,
    method: 'post',
    data
  })
}

export function getArticle(id, data) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`,
    method: 'get',
    data
  })
}

