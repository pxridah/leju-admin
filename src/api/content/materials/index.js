import request from '@/utils/request'

export function getAllArticles(start, limit, data) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`,
    method: 'get',
    data
  })
}
export function delteMaterial(id, data) {
  return request({
    url: `/lejuAdmin/material/delMaterial/${id}`,
    method: 'delete',
    data
  })
}

