import request from '@/utils/request'

export function getAllArticles(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data
  })
}

export function changeShowStatus(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'post',
    data
  })
}

export function deleteArticle(id, data) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'delete',
    data
  })
}

