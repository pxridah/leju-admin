import request from '@/utils/request'

export function getAllRecommends(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/findAllRecommends`,
    method: 'get',
    data
  })
}

export function delteRecommend(recommendId, data) {
  return request({
    url: `/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
    method: 'delete',
    data
  })
}

