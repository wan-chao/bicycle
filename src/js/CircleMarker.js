import AMap from 'AMap'
import {BIKE_TYPE} from '@/config/config'
import InfoWindow from './InfoWindow'
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
        let styColor = this.infoWindowColor()
        let htmlData = {
            html:`<div class=${styColor}>${this.r.num}</div>`
        }
        let imageSize = {width:this.radius}
        this.infowwindow = new InfoWindow(this.map,this.x,this.y,htmlData,imageSize)
        this.circleMarker.on('click',this.handleClick,this)
    }
    creatMarker(){
        return this.circleMarker
    }
    infoWindowColor(){
        let index = BIKE_TYPE.findIndex(v=>{
            return v.color === this.color 
        })
        if(index === 0){
            return 'lab-red'
        }else if(index === 1){
            return 'lab-blue'
        }else if(index === 2){
            return 'lab-green'
        }else{
            return ''
        }
    }
    handleClick(){
        this.infowwindow.getIsOpen()?this.infowwindow.close():this.infowwindow.open()
    }
}