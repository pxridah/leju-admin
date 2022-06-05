import request from '@/utils/request'

export function findReturnApply(start, limit, data) {
  return request({
    url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
    method: 'post',
    data
  })
}
