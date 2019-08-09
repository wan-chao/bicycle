<template>
  <el-container style="height:100%">
    <el-main style="padding:0;height:100%">
      <div class="header-icon"></div>
      <div class="my-header">
        <my-header ref="myHeader"></my-header>
      </div>
      <div class="header-list">
        <action-list @change="actionChange"></action-list>
      </div>
      <div class="header-btn">
        <type-btn :list="bikeType"></type-btn>
      </div>
      <div id="allmap"></div>
      <div class="box-display">
        <info-box v-for="(list,index) in infoList" :key="index" :item="list" @out="outHtml"></info-box>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import MyHeader from '@/components/my-header'
import TypeBtn from './type-btn'
import ActionList from './action-list'
import InfoBox from './info-box'
import AMap from 'AMap'
import _ from 'lodash'
import {XYZ_URL,ZOOM,MAP_OPTS,BIKES_URL,CHECK_URL,SUBSECTION,TRAVEL,BIKE_STATUS,BIKE_AREA,BIKE_TYPE,STAUTS_TYPE} from '@/config/config'
import {createMarker,createCircleMarker,createSquareIcon} from '@/js/Marker'
import {latestTime,bikes} from '@/api/map'

const XYZ_MARKER={
  BIKE:'BIKE_XYZ_MARKER'
}

export default {
  name: 'home',
  components: {
    MyHeader,TypeBtn,ActionList,InfoBox
  },
  data(){
    return {
      zoom:ZOOM,
      bikesMarkers:[],
      statusMarkers:[],
      infoWindowHtml:[],
      infoWindowMarker:[],
      bikeType:BIKE_TYPE,
      infoList:[
        {
          title:'洪山区运维人员',
          list:[
            {type:'哈啰单车',name:'赵一， 15827585807'},
            {type:'摩拜单车',name:'钱二， 15907599000'},
            {type:'OFO',name:'孙三， 00000000000'}
          ],
          center:{pos:[114.428403,30.610638]}
        },
        {
          title:'武昌区运维人员',
          list:[
            {type:'哈啰单车',name:'赵一， 15827585807'},
            {type:'摩拜单车',name:'钱二， 15907599000'},
            {type:'OFO',name:'孙三， 00000000000'}
          ],
          center:{pos:[114.319913,30.550193]}
        },
        {
          title:'汉阳区运维人员',
          list:[
            {type:'哈啰单车',name:'赵一， 15827585807'},
            {type:'摩拜单车',name:'钱二， 15907599000'},
            {type:'OFO',name:'孙三， 00000000000'}
          ],
          center:{pos:[114.204385,30.544428]}
        },
      ],
      icon:require('../../assets/images/icon13.png'),
      infoIcon:require('../../assets/images/infoIcon.png'),
      circularIcon:require('../../assets/images/circular.png'),
      squareIcon:require('../../assets/images/square.png'),
      deltaIcon:require('../../assets/images/delta.png'),
    }
  },
  computed:{
    bikeSelect(){
      return this.$store.state.map.bikeList
    },
    showSubsection(){
      return this.$store.state.map.subsection
    },
    showTravel(){
      return this.$store.state.map.travel
    },
    showBikeStatus(){
      return this.$store.state.map.bikeStatus
    },
    showBikeArea(){
      return this.$store.state.map.bikeArea
    }
  },
  methods:{
    //地图初始化
    initMapData(){
      this.map.on("complete", this.mapComplete);
      this.map.setMapStyle('amap://styles/3e889914bd0685133aa05100290982bb');
      // this.map.setFeatures(["road","building"])
      this.map.on('zoomchange',this.mapZoomChange)
      this.map.on('click',this.mouseClick)
      this.loadMapMarker()
    },

    //地图初始化时加载的图层
    loadMapMarker(){
      this.initInfoBox();
      this.showSubsection&&this.markerReload(SUBSECTION);
      this.showTravel&&this.addXYZMarker('BIKE',XYZ_URL.BIKE)
      this.showBikeStatus&&this.markerReload(BIKE_STATUS)
    },

    //地图功能显示切换
    actionChange(show,name){
      if(name===SUBSECTION){
        show?this.markerReload(SUBSECTION):this.clearMarker(this.bikesMarkers)
      }else if(name===TRAVEL){
        show?this.ReloadXYZMarker('BIKE',XYZ_URL.BIKE):this.map.remove(XYZ_MARKER['BIKE'])
      }else if(name===BIKE_STATUS){
        show?this.markerReload(BIKE_STATUS):this.clearMarker(this.statusMarkers)
      }
    },

    outHtml(data) {
      //构建信息窗体中显示的内容
      this.infoWindowHtml.push(data);
    },

    initInfoBox(){
      this.infoWindowHtml.forEach((item,index)=>{
        let m= createMarker(this.infoIcon,item.center.pos[0],item.center.pos[1],this.markerClick);
        this.map.add(m)
        let infoWindow = new AMap.InfoWindow({
          isCustom: true,  //使用自定义窗体
          content: item.html,  //使用默认信息窗体框样式，显示信息内容
          offset: new AMap.Pixel(1, -25),
          position:[item.center.pos[0],item.center.pos[1]]
        });
        this.infoWindowMarker.push(infoWindow)
        index===0&&infoWindow.open(this.map, [item.center.pos[0],item.center.pos[1]])
      })
    },

    //点击覆盖物
    markerClick(e){
      console.log('覆盖物被点击')
      let marker = e.target.getPosition()
      let icon = e.target.getIcon()
      if(icon===this.infoIcon){
        this.infoWindowMarker.forEach(v=>{
          let window = v.getPosition();
          if(marker.lat===window.lat&&marker.lng===window.lng){
            v.getIsOpen()?v.close():v.open(this.map, [window.lng,window.lat])
          }
        })
      }
    },

    reload(){
      if(this.showSubsection){
        this.markerReload(SUBSECTION)
      }
      if(this.showTravel){
        this.ReloadXYZMarker('BIKE',XYZ_URL.BIKE)
      }
      if(this.showBikeStatus){
        this.markerReload(BIKE_STATUS)
      }
      if(this.showBikeArea){
        console.log('bikeArea')
      }
    },

    markerReload(type){
      if(type===SUBSECTION){
        this.clearMarker(this.bikesMarkers);
        this.bikesMarkers=[]
        setTimeout(()=>{
          this.paintCircleMarker(BIKES_URL,this.bikesMarkers,this.bikeSelect)
        },50)
      }else if(type===BIKE_STATUS){
        this.clearMarker(this.statusMarkers);
        this.statusMarkers=[]
        setTimeout(()=>{
          this.paintCircleMarker(CHECK_URL,this.statusMarkers,this.bikeSelect)
        },50)
      }
    },

    //地图缩放等级改变时
    mapZoomChange:_.debounce(function(){
      let zoom = this.map.getZoom()
      this.zoom=zoom
      this.showSubsection&&this.markerReload(SUBSECTION);
      this.showBikeStatus&&this.markerReload(BIKE_STATUS)
    },1000),


    //请求获取聚合点数组
    async paintCircleMarker(type,markerList,list){
      let bounds = this.map.getBounds();
      let ne = `${bounds.getNorthEast().lng},${bounds.getNorthEast().lat}`;
      let sw =`${bounds.getSouthWest().lng},${bounds.getSouthWest().lat}`;

      let latest = await latestTime('mobike');

      let latestDate = new Date(latest.result).getTime()
      let time = Math.round(latestDate / 1000);

      this.setGetDataTime(latestDate);

      for(let item of list){
        let res = await bikes(type,item,ne,sw,this.zoom,time)
        if(type===BIKES_URL){  //车辆分布
          console.log('车辆分布',res)
          let index = BIKE_TYPE.findIndex(v=>{
            return v.type === item
          })
          if(res.result) this.polymerPointDraw(res,markerList,BIKE_TYPE[index].color)
        }else if(type===CHECK_URL){  //车辆状态
          console.log('车辆状态',res)
          res.forEach((r,index)=>{
            if(index===0){
              this.drawIconMarker(r,markerList,this.circularIcon)
            }else if(index===1){
              this.drawIconMarker(r,markerList,this.squareIcon)
            }else if(index===2){
              this.drawIconMarker(r,markerList,this.deltaIcon)
            }
          })
        }
      }
    },

    drawIconMarker(res,markerList,icon){
      let routes = res.result;
      let max_num = res.max_num;
      routes.forEach(r => {
        let m;
        if (this.zoom >= 18) {
          m =createMarker(this.icon,r.lon,r.lat,this.markerClick)
        }else{
          let radius = this.zoom * (r.num / max_num)*2;
          if (radius < 8) radius = 8;
          if (radius > 64) radius = 64;
          let newIcon = createSquareIcon(icon,radius*3)
          m =createMarker(newIcon,r.lon,r.lat,this.markerClick)
        }
        markerList.push(m);
      });
      this.map.add(markerList)
    },

    //聚合点的绘制规制
    polymerPointDraw(res,markerList,color){
      let routes = res.result;
      let max_num = res.max_num;
      routes.forEach(r => {
        let m;
        if (this.zoom >= 18) {
          m =createMarker(this.icon,r.lon,r.lat,this.markerClick)
        }else{
          let radius = this.zoom * (r.num / max_num)*2;
          if (radius < 8) radius = 8;
          if (radius > 64) radius = 64;
          m = createCircleMarker(r.lon,r.lat,color,radius)
        }
        markerList.push(m);
      });
      this.map.add(markerList)
    },

    //设置数据获取时的时间
    setGetDataTime(timestamp) {
      var date = new Date(timestamp);
      let Y = date.getFullYear();
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
      let D = date.getDate();
      let h = date.getHours()<10?`0${date.getHours()}`:date.getHours();
      let m = date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes();
      let s = date.getSeconds()<10?`0${date.getSeconds()}`:date.getSeconds();

      let sysTime =  `${Y}年${M}月${D}日;${h}:${m}:${s}`;
      this.$store.dispatch('map/setTimes',sysTime);
      localStorage.setItem('sysTime',sysTime);
    },

    //添加XYZ栅格图层
    addXYZMarker(name,url){
      let t =new Date().getTime()
      XYZ_MARKER[name] = new AMap.TileLayer({
        getTileUrl: `${url}&t=${t}`,
        zIndex:100
      });
      this.map.add(XYZ_MARKER[name]);
    },

    //重新加载XYZ栅格图层
    ReloadXYZMarker(name,url){
      let marker = XYZ_MARKER[name]
      this.map&&this.map.remove(marker)
      this.addXYZMarker(name,url)
    },

    //地图移除多个覆盖物
    clearMarker(list){
      this.map&&this.map.remove(list)
    },

    //鼠标左键点击地图
    mouseClick(e){
      console.log(e)
    },
    mapComplete(){
      console.log('地图加载完成')
    }
  },
  watch:{
    bikeSelect(val){
      this.map&&this.reload();
    },
  },
  mounted(){
    this.map = new AMap.Map('allmap',MAP_OPTS);
    this.initMapData()
  },
  destroyed(){
    this.map&&this.map.destroy();
  }
}
</script>

<style lang="less" scoped>
#allmap{
  width: 100%;
  height: 100%;
}
.header-icon{
  position: fixed;
  top: 25px;
  left: 35px;
  z-index: 10;
  width: 60px;
  height:371px;
  background: url('../../assets/images/left_icon.png') no-repeat;
  background-size:100% 100%;
}
.my-header{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height:120px;
}
.header-list{
  position: fixed;
  top: 148px;
  left:65px;
  z-index: 10;
}
.header-btn{
  position: fixed;
  top: 343px;
  left: 35px;
  z-index: 10;
}
.box-display{
  position: absolute;
  top: 100px;
  right: 0;
  z-index: -10;
  opacity: 0;
}
</style>

