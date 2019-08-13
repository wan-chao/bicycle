import AMap from 'AMap'

export default class MarkerIcon  {
    constructor (image,scale) {
        this.image = image
        this.scale = scale
        this.initMarker()
    }
    initMarker(){
        this.icon = new AMap.Icon({
            // 图标尺寸
            size: new AMap.Size(this.scale, this.scale),
            // 图标的取图地址
            image:this.image,
            imageSize: new AMap.Size(this.scale, this.scale),
        });
    }
    create(){
        return this.icon
    }
}
 