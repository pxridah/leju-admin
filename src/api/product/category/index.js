import request from '@/utils/request'

export function getAllCategory(data) {
  return request({
    url: `/lejuAdmin/category/getAllCategory`,
    method: 'get',
    data
  })
}

