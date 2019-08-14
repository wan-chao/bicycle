import AMap from 'AMap'

export default class InfoWindow  {
    constructor (map,lng,lat,data,size='') {
        this.map = map
        this.lng = lng
        this.lat = lat
        this.data = data
        this.size = size
        this.init()
    }
    init(){
        this.infoWindow = new AMap.InfoWindow({
            isCustom: true,  //使用自定义窗体
            content: this.data.html,  //使用默认信息窗体框样式，显示信息内容
            offset: this.setOffset(),
            position:[this.lng,this.lat]
        })
    }
    create(){
        return this.infoWindow
    }
    setOffset(){
        if(this.data.center){
            return new AMap.Pixel(1, -25)
        }else{
            return new AMap.Pixel(this.size.width/4, -25)
        }
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
 