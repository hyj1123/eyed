// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Button, Cell,Badge } from 'mint-ui'
import axios from 'axios'
import router from './router'

Vue.prototype.$http = axios
Vue.component(Button.name,Button)
Vue.component(Cell.name,Cell)
Vue.component(Badge.name,Badge)
Vue.config.productionTip = false

Vue.filter('transformTime', function (value) {
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - value;
  let result = '';
  if(diffValue < 0){
    //若日期不符则弹出窗口告之
    result = '#';
  }
  let monthC =diffValue/month;
  let weekC =diffValue/(7*day);
  let dayC =diffValue/day;
  let hourC =diffValue/hour;
  let minC =diffValue/minute;
  if(monthC>=1){
    result=parseInt(monthC) + "个月前";
  }
  else if(weekC>=1){
    result=parseInt(weekC) + "周前";
  }
  else if(dayC>=1){
    result=parseInt(dayC) +"天前";
  }
  else if(hourC>=1){
    result= parseInt(hourC) +"个小时前";
  }
  else if(minC>=1){
    result=parseInt(minC) +"分钟前";
  }else {
    result="刚刚发表";
  }
  return result;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //template: `
  //  <mt-button type="default">default</mt-button>
  //`,
  //components: { App }
  template: `<App />`,
  components: {
    App
  }
})
