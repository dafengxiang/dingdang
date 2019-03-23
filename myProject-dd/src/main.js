// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App.vue'

//引入axios库
import axios from "axios";
//引入qs
import qs from 'qs'
//配置跨域访问，保存session
axios.defaults.withCredentials=true;
//将axios库配置到Vue中
Vue.prototype.axios=axios;
Vue.prototype.qs=qs;
//引入vuex
import Vuex from 'vuex'
//注册
Vue.use(Vuex)
//创建store
var store= new Vuex.Store({
  state:{
    cartCount:sessionStorage.getItem("cartCount")||0 //共享数据：购物车中商品数量
  },
  mutations:{   //点击商品详情加入购物车
    increment(state){
      state.cartCount++;
      sessionStorage.setItem("cartCount",state.cartCount);
    },
    down(state){
      state.cartCount--;
      sessionStorage.setItem("cartCount",state.cartCount);
    },
    //显示购物车列表时
    updateCount(state,count){
      state.cartCount+=count;
      sessionStorage.setItem("cartCount",state.cartCount);
    },
    Count(state,count){
      state.cartCount=count;
      sessionStorage.setItem("cartCount",count);
    }
  },
  getters:{
    optCartCount:function(state){
      return state.cartCount;
    }
  }
})
//将store对象添加Vue实例成一个属性80行
import 'mint-ui/lib/style.css'
import {Header,Swipe,SwipeItem} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
//import '../src/lib/mui/js/mui.js'

// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件

Vue.filter("datCha",function(val){
    var date=new Date(val);
    var s=date.toLocaleDateString();
    var str=s.slice(0,4)+"年"+s.slice(5,7)+"月"
    return (str);
})
Vue.filter("famCha",function(val){
  //方法一：
  /*if(val=="rx")return "热销书";
  else if(val=="ts")return "童书";
  else if(val=="xs")return "小说";
  else if(val=="dz")return "电子书";
  else return "其他";*/
  //方法二：
  switch(val){
    case "rx": return "热销书"; break;
    case "ts": return "童书"; break;
    case "xs": return "小说"; break;
    case "dz": return "电子书"; break;
    default: return "其他";
  }
})
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
