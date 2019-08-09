const state = {
  times:localStorage.sysTime || '2019年00月00日;00:00:00',
  subsection:true,
  travel:false,
  bikeStatus:false,
  bikeArea:false,
  bikeList:localStorage.bikeSele?JSON.parse(localStorage.bikeSele) : ['mobike','ttbike','ofo'],
}

const mutations = {
  SET_TIMES(state,data){
    state.times=data
  },
  SET_SUBSECTION(state,data){
    state.subsection=data
  },
  SET_TRAVEL(state,data){
    state.travel=data
  },
  SET_BIKE_STATUS(state,data){
    state.bikeStatus=data
  },
  SET_BIKE_AREA(state,data){
    state.bikeArea=data
  },
  ADD_BIKE(state,data){
    state.bikeList.push(data)
  },
  MIX_BIKE(state,index){
    state.bikeList.splice(index,1);
  },
};


const actions = {
  setTimes:({commit},data)=>{
    commit('SET_TIMES',data)
  },
  setSubsection:({commit},data)=>{
    commit('SET_SUBSECTION',data)
  },
  setTravel:({commit},data)=>{
    commit('SET_TRAVEL',data)
  },
  setBikeStatus:({commit},data)=>{
    commit('SET_BIKE_STATUS',data)
  },
  setBikeArea:({commit},data)=>{
    commit('SET_BIKE_AREA',data)
  },
  addBike:({commit},data)=>{
    commit('ADD_BIKE',data)
  },
  mixBike:({commit},index)=>{
    commit('MIX_BIKE',index)
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
