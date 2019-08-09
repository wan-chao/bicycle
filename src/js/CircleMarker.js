import AMap from 'AMap'

export default class CircleMarker  {
    constructor (x,y,color,radius,callback) {
        this.x=x
        this.y=y
        this.color=color
        this.radius=radius
        this.callback=callback
        this.initMarker()
    }
    initMarker(){
        this.circleMarker = new AMap.CircleMarker({
            center:[this.x, this.y],
            radius:this.radius,//3D视图下，CircleMarker半径不要超过64px
            // strokeColor:'white',
            // strokeWeight:0,
            // strokeOpacity:0.5,
            //fillColor:'rgba(' + r.num * 255 / max_num + ',0,0,1)',
            fillColor:'rgba(' + this.color + ')',
            fillOpacity:0.5,
            zIndex:-100,
            bubble:true,
            cursor:'pointer',
            clickable: true
        })
        this.circleMarker.on('click',this.callback)
    }
    show(){
        
    }
    hide(){
        
    }
}

export function createCircleMarker(r,color,radius){
    return new CircleMarker(r.x,r.y,color,radius).circleMarker
}
 