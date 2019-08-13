import AMap from 'AMap'

export default class InfoWindow  {
    constructor (map,lng,lat,data) {
        this.map = map
        this.lng = lng
        this.lat = lat
        this.data = data
        this.init()
    }
    init(){
        this.infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: this.data.html,  //使用默认信息窗体框样式，显示信息内容
            offset: new AMap.Pixel(1, -25),
            position:[this.data.center.pos[0],this.data.center.pos[1]]
        })
    }
    create(){
        return this.infoWindow
    }
    getIsOpen(){
        return this.infoWindow.getIsOpen()
    }
    close(){
        this.infoWindow.close()
    }
    open(){
        this.infoWindow.open(this.map, [this.lng,this.lat])
    }
    
}
 