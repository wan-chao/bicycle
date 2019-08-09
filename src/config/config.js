export const SPACE_TIME = 1000*60*60*8;

export const XYZ_URL = {
  BIKE:'/apx/tile?x=[x]&y=[y]&z=[z]'
}

export const ZOOM = 12

export const MAP_OPTS={
  zoom: ZOOM,  //设置地图显示的缩放级别
  center: [114.30, 30.60],//设置地图中心点坐标
}

export const BIKE_TYPE = [
  {name:'摩拜',type:'mobike',color:'#fd4914'},
  {name:'hello bike',type:'ttbike',color:'#0098fd'},
  {name:'青桔',type:'ofo',color:'#15d0b5'},
]

export const STAUTS_TYPE = [
  {type:'正常',color:'#ef2b2c'},
  {type:'不活跃',color:'#0cc90d'},
  {type:'僵尸车',color:'#fa9d00'},
]

export const BIKES_URL = 'apx/bikes'
export const CHECK_URL = 'apx/check'

export const SUBSECTION = 'SUBSECTION' //车辆分布
export const TRAVEL = 'TRAVEL'  //骑行轨迹
export const BIKE_STATUS = 'BIKE_STATUS' //车辆状态
export const BIKE_AREA = 'BIKE_AREA' //停车区域