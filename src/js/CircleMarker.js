import AMap from 'AMap'

export default class CircleMarker { 
    constructor (map,r,color,radius) {
        this.r=r
        this.x=r.lon
        this.y=r.lat
        this.map=map
        this.color=color
        this.radius=radius
        this.initMarker()
    }
    initMarker(){
        this.circleMarker = new AMap.CircleMarker({
            center:[this.x, this.y],
            radius:this.radius,//3D视图下，CircleMarker半径不要超过64px
            strokeColor:this.color,
            strokeWeight:0,
            strokeOpacity:0.5,
            //fillColor:'rgba(' + r.num * 255 / max_num + ',0,0,1)',
            fillColor:this.color,
            fillOpacity:0.8,
            zIndex:-100,
            bubble:true,
            cursor:'pointer',
            clickable: true
        })
        this.circleMarker.on('click',this.handleClick,this)
    }
    creatMarker(){
        return this.circleMarker
    }
    handleClick(){
        let infoWindow = new AMap.InfoWindow({
            content: `单车数量：${this.r.num}`,
            offset:new AMap.Pixel(0, -this.y*0.8)
        });
        infoWindow.open(this.map, [this.x, this.y]);
    }
}