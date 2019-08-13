import AMap from 'AMap'
import InfoWindow from './InfoWindow'
export default class Marker  {
    constructor (map,icon,x,y,data='') {
        this.map=map
        this.icon=icon
        this.x=x
        this.y=y
        this.data = data
        this.initMarker()
    }
    initMarker(){
        this.marker = new AMap.Marker({
            position: new AMap.LngLat(this.x, this.y),
            icon: this.icon
        });
        this.marker.on('click',this.handleClick,this)
        if(this.data){
            this.infowwindow = new InfoWindow(this.map,this.x,this.y,this.data)
        }
    }
    createMarker(){
        return this.marker
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
 