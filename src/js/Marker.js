import AMap from 'AMap'
import {STAUTS_TYPE} from '@/config/config'
import InfoWindow from './InfoWindow'
export default class Marker  {
    constructor (map,icon,x,y,data='',type='') {
        this.map=map
        this.icon=icon
        this.x=x
        this.y=y
        this.data = data
        this.type = type
        this.initMarker()
    }
    initMarker(){
        this.marker = new AMap.Marker({
            position: new AMap.LngLat(this.x, this.y),
            icon: this.icon
        });
        this.marker.on('click',this.handleClick,this)
   
        if(this.data.center){
            this.infowwindow = new InfoWindow(this.map,this.x,this.y,this.data)
        }else if(this.data.num){
            let color = this.infoWindowColor()
            let imageSize = this.icon.getImageSize()
            let htmlData = {
                html:`<div class=${color}>${this.data.num}</div>`
            }
            this.infowwindow = new InfoWindow(this.map,this.x,this.y,htmlData,imageSize)
        }
    }
    createMarker(){
        return this.marker
    }
    infoWindowColor(){
        if(this.type === STAUTS_TYPE[0].type){
            return 'lab-green'
        }else if(this.type === STAUTS_TYPE[1].type){
            return 'lab-blue'
        }else if(this.type === STAUTS_TYPE[2].type){
            return 'lab-red'
        }else{
            return ''
        }
    }
    handleClick(){
        console.log('覆盖物被点击')
        if(this.data){
            this.infowwindow.getIsOpen()?this.infowwindow.close():this.infowwindow.open()
        }
    }
    setTitle(){
        this.marker.setTitle('我是marker的title');
    }
    show(){
        
    }
    hide(){
        
    }
}
 