<template>
    <div id="cart">
        <header class="mui-bar mui-bar-nav" id="detailHead">
			<a class=" mui-icon mui-icon-left-nav" @click="reto"></a>
			<span>购物车</span>
		</header>
        <div class="bac">
            <input type="checkbox" class="cir" v-model="checked" @click="checkall"></input>
            <span>叮当网</span>
        </div>
        <div class="bac" v-for="(item,i) of list" :key="i">
        <!--复选框-->
            <input type="checkbox" class="cir pro" v-model="item.cd" @click="check"></input>
        <!--详情-->
            <span>
                <img :src="'http://wangfengxiang.applinzi.com/'+item.lg" @click="jumpDet" :data-pid="item.pid">
                <span class="left">
                    <span class="title">{{item.title}}</span>
                    <span class="price">￥{{item.price.toFixed(2)}}</span>
                    <div class="mui-numbox">
                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="change" :data-id="item.id" :data-add="1" :data-i="i">-</button>
                        <input class="mui-input-numbox" type="number" :value="item.cont" />
                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="change"  :data-id="item.id"  :data-i="i"  :data-add="-1">+</button>
                    </div> 
                </span>
            </span>
            <p>
                <span class="hkk">加价购</span>
                <span>&nbsp;&nbsp;购买一件即可享受换购优惠</span>
                <router-link class="more" to="#">去选择<span class="mui-icon mui-icon-forward"></span>
                </router-link>
            </p>
        </div>
        <div class="sumBox">
            <input type="checkbox" class="cir pro" v-model="checked" @click="checkall">
            <span class="sum">全选</span>
            <span class="count">合计：￥{{sum.toFixed(2)}}</span>
            <button>去结算({{this.count}})</button>
        </div>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
import {MessageBox} from "mint-ui"
export default {
    data(){
        return {
            list:[],
            checked:false,//全选按钮状态
            count:0
        }
    },
    methods:{
        //全选按钮点击事件
        checkall(e){
            if(e.target.checked==true){
                this.checked=true;
                for(var item of this.list){
                    item.cd=true;
                    this.count=this.list.length;
                }
            }else{
                this.checked=false;
                for(var item of this.list){
                    item.cd=false;
                    this.count=0;
                }
            }
        },
        //列表复选按钮功能
        check(e){
            if(e.target.checked==true){
                this.count++;
                if(this.count==this.list.length){
                    this.checked=true;
                }
            }else{
                this.count--;
                this.checked=false;
            }
        },
        reto(){
            history.go(-1);
        },
        jumpDet(e){
            var pid=e.target.dataset.pid;
            var url="/detail?pid="+pid;
            this.$router.push(url);
        },
        getcart(){
            var uid=sessionStorage.getItem("uid");
            if(uid==null){
                Toast("请先登录")
            }else{
            var url="http://wangfengxiang.applinzi.com/getcart?uid="+uid;
            this.axios.get(url).then(res=>{
                if(res.data.code==1){
                for(var item of res.data.data){
                    item.cd=false;
                };
                    this.list=res.data.data;
                }
                else{
                    Toast(res.data.msg)
                }
            })   
            }
            
        },
        change(e){
            var num=e.target.dataset.add;
            var id=e.target.dataset.id;
            var i=e.target.dataset.i;
            if(num==1&&this.list[i].cont==1){
                MessageBox.confirm("确定删除此商品?").then(action=>{
                    if(action=='confirm'){
                        var postData=this.qs.stringify({
                            id,
                        })
                        var url="http://wangfengxiang.applinzi.com/delcart";
                        this.axios.post(url,postData).then(res=>{
                            if(res.data.code==1){
                                this.list.splice(i,1)
                            }
                        });
                         this.$store.commit("down");
                         this.count--;
                    }
                }).catch(err=>{
                    if(err=='cancel'){
                        console.log(1)
                    }
                })
            }else{
                this.list[i].cont=this.list[i].cont-num;
                var n=this.list[i].cont;
                var postData=this.qs.stringify({
                    id,
                    n  
                    })
                
                var url="http://wangfengxiang.applinzi.com/chacart" ;
                this.axios.post(url,postData).then(res=>{  
                })  
            }
            
        }
    },
    created(){
        this.getcart();
    },
    computed:{
       sum(){
           var sum=0;
           for(var item of this.list){
               if(item.cd==true)sum+=item.cont*item.price;
           }
           return sum;
       } 
    },
}
</script>
<style>
    #cart{
      width:100%;
      margin-bottom:50px;
    }
    #cart .bac{
        background:#fff;
        width:97%;
        border-radius:8px;
        padding:15px;
        margin:10px 5px;
        font:bold 15px "等线体"; 
    }
    #cart .bac .cir{
        float:left;
        width:15px;
        height:15px;
        margin-right:10px; 
    }
    #cart .bac .pro{
        vertical-align:middle;   
    }
    #cart .bac img{
        width:80px;
        height:100px;
    }
    #cart .bac .left{
        float:right;
        width:150px;
        height:100px;
    }
    #cart .bac .title{
        display:inline-block;
        font:0.6rem "等线体";
        width:100%;
        height:37px;
        overflow:hidden;
    }
    #cart .bac .price{
        color:#f00;
        font:bold 16px "等线体";
    }
    #cart .hkk{
        border-radius:2px;
        font:10px "等线体";
        color:red;
        border:1px solid red;
        font-weight:400 !important;
    }
    #cart .more{
        float:right;
        font:12px "等线体";
        color:#000;
    }
    #cart .sumBox{
        width:100%;
        height:50px;
        background:#fff;
        position:fixed;
        bottom:50px;
        box-shadow:0px -2px 3px 0px #aaa;
        padding:3px 15px;
        font:bold 15px "等线体";
    }
    #cart .sumBox input{
        margin-top:15px;
    }
    #cart .sumBox span{
        margin-right:15px;
    }
    #cart .sumBox button{
        float:right;
        margin-top:5px;
        background-image:linear-gradient(90deg,#f50 0%,#fd1f79 100%);
        color:#fff;
    }
</style>