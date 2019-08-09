import http from '@/util/http'

// 获取最新时间
export function latestTime(src) {
  return http({
    url: '/apx/latest',
    method: 'GET',
    params: {
      src,
    },
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })
}

// 获取聚类点
export function bikes(type,src, ne,sw,zoom,time) {
  return http({
      url: type,
      method: 'GET',
      params: {
        src,
        ne,
        sw,
        zoom,
        time
      },
      headers:{
          'Content-Type':'application/x-www-form-urlencoded'
      }
  })
}