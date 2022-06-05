import request from '@/utils/request'

export function getMembersList(start, limit, data) {
  return request({
    url: `/lejuAdmin/member/findMembersByPage/${start}/${limit}`,
    method: 'get',
    data
  })
}
