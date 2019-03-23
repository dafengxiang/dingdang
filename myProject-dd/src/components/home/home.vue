<template>
<div class="tmphome">
    <mt-header fixed title="叮当东书城" id="my_header"></mt-header> 
    <!--搜索框-->
    <div class="mui-input-row mui-search">
        <input type="search" class="mui-input-clear mui-icon mui-icon-search" placeholder="30万图书，5折封顶" list="list1" v-model="ipt" @focus="iptFoc" @keyup="watScr" @blur="seaBlu">
    </div>
    <!--轮播图-->
    <mt-swipe class="banner">
        <mt-swipe-item v-for="(p,i) of list" :key="i">
           <img :src="p.img_url" alt="">
        </mt-swipe-item>
    </mt-swipe>
    <!--搜索提示-->
     <div class="data" :style="status">
        <ul type="none">
        <span v-for="(item,i) of secLis" :key="i" class="seaFon">
            <li @click="chosed" :data-con="item.title">{{item.title}}</li>
        </span>
        </ul>
    </div>
    <!--九宫格-->
    <ul class="mui-table-view mui-grid-view mui-grid-9" id="ul1">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/family?pid=rx"> 
                <img src="../../img/menu1.png" />
                <div class="mui-media-body">畅销榜</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link href to="/family?pid=ts">
                <img src="../../img/menu3.png" />
                <div class="mui-media-body">童书榜</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/family?pid=rx">
                <img src="../../img/menu2.png" />
                <div class="mui-media-body">新书榜</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/family?pid=xs">
                <img src="../../img/menu4.png" />
                <div class="mui-media-body">小说榜</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/family?pid=rx">
                <img src="../../img/menu5.png" />
                <div class="mui-media-body">特卖</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/family?pid=dz">
                <img src="../../img/menu6.png" />
                <div class="mui-media-body">电子书</div>
            </router-link>
        </li>
    </ul>
</div>
</template>
<script>
export default{
    data(){
        return {
            list:[
                {img_url:"http://wangfengxiang.applinzi.com/img/banner/banner1.jpg"},
                {img_url:"http://wangfengxiang.applinzi.com/img/banner/banner2.jpg"},
                {img_url:"http://wangfengxiang.applinzi.com/img/banner/banner3.jpg"}
                ],
            ipt:"",
            status:"display:none",
            secLis:[]
        }
    },
    methods: {
        chosed(e){
            var con=e.target.dataset.con;
            this.ipt=con;
            this.status="display:none";
        },
        iptFoc(){
           this.status="display:block";
           var url="http://wangfengxiang.applinzi.com/datalist";
           this.axios.get(url).then(res=>{
               var arr=res.data.data;
               var arr1=arr.slice(-5);
               this.secLis=[];
               for(var item of arr1){
                   this.secLis.unshift(item);
               }
               console.log(this.secLis)
           })
        },
        watScr(e){
            if(e.keyCode==13){ 

            }else{
            this.search(); 
            }
        },
        search(){
            if(this.ipt!=undefined){
                var msg=this.ipt;
                var url="http://wangfengxiang.applinzi.com/getSearch?msg="+msg;
                console.log(url)
                this.axios.get(url).then(res=>{
                    if(res.data.data!=undefined){
                    this.status="display:block";
                    this.secLis=res.data.data.slice(-5);   
                    }
                })  
            }
            
        },
        seaBlu(){
            this.status="display:hidden";
            console.log(this.status);
        }
    }
}
</script> 
<style>
.tmphome .banner{
    height:134px;
}
.tmphome .banner img{
    height:100%;
}
.tmphome #ul1 li{
    background-color:#fff;
}
.tmphome #ul1 img{
    width:100%
}
.tmphome .data{
    position:absolute;
    top:74px;
    width:100%;
    z-index:200;
    background:#fff;
    border-radius:10px;
}
.tmphome .data span:not(:last-child){
    border-bottom:1px dotted #ccc;
}
.tmphome .data li:hover{
    background:#ddd;
}
.tmphome .data ul{
    margin:0;
    padding:0 10px;
}
.tmphome .seaFon{
    display:block;
    font:bold 12px "等线体";
}
</style>
 