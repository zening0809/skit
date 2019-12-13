import request from '@/utils/request'
export function testList(query) {
    return request({
      url: '/test/list',
      method: 'get',
      params: query
    })
  }