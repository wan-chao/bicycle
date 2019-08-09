import AMap from 'AMap'

export default class Marker  {
    constructor (icon,x,y,callback) {
        this.icon=icon
        this.x=x
        this.y=y
        this.callback=callback
        this.initMarker()
    }
    initMarker(){
        this.marker = new AMap.Marker({
            position: new AMap.LngLat(this.x, this.y),
            icon: this.icon
        });
        this.marker.on('click',this.callback)
    }
    show(){
        
    }
    hide(){
        
    }
}

export function createMarker(icon,r,callback){
    return new Marker(icon,r.pos[0],r.pos[1],callback).marker
}

export function createCircleMarker(x,y,color,radius){
    return new AMap.CircleMarker({
        center:[x, y],
        radius,//3D视图下，CircleMarker半径不要超过64px
        strokeColor:color,
        strokeWeight:0,
        strokeOpacity:0.5,
        //fillColor:'rgba(' + r.num * 255 / max_num + ',0,0,1)',
        fillColor:color,
        fillOpacity:0.8,
        zIndex:-100,
        bubble:true,
        cursor:'pointer',
        clickable: true
    })
}
 