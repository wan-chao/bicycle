<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
    
  </div>
</template>

<style lang="less">
html,body{
  width: 100%;
  height: 100%;
  background: #031b2f;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
  height: 100%;
}
.lab-blue{
  position: relative;
  width: 90px;
  height: 50px;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  background: url('./assets/images/lab_blue.png') no-repeat;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.lab-red{
  position: relative;
  width: 90px;
  height: 50px;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  background: url('./assets/images/lab_red.png') no-repeat;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.lab-green{
  position: relative;
  width: 90px;
  height: 50px;
  line-height: 40px;
  color: #fff;
  font-size: 14px;
  background: url('./assets/images/lab_green.png') no-repeat;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.bounce-enter-active {
  animation: bounce-in .5s reverse;
}
.bounce-leave-active {
  animation: bounce-in .3s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
