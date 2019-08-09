import http from '@/util/http'

// 统计0-闲置率分析
export function statistic(type,from,to) {
  return http({
      url: '/apx/statistic',
      method: 'GET',
      params: {
        type,
        from,
        to
      }
  })
}