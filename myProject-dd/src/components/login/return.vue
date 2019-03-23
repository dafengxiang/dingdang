<template>
    <div class="return">
        <header class="mui-bar mui-bar-nav" id="familyHead">
			<a class=" mui-icon mui-icon-left-nav" @click="reto"></a>
			<span>退出登录</span>
	    </header>
        <button type="button" class="mui-btn mui-btn-danger mui-btn-block" @click="ret">退出登录</button>  
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    data(){
        return{
            list:[]
        }
    },
    methods:{
    //回退 
        reto(){
            history.go(-1);
        },
    //退出登录
        ret(){
           var uid=sessionStorage.getItem("uid");
           if(uid!=null){
               sessionStorage.removeItem("uid");
               sessionStorage.removeItem("uname");
               Toast("退出成功");
               this.$store.commit("Count",0);
               history.go(-1);
           }else{
               Toast("未登录");
           }
        }
    }
    
}
</script>