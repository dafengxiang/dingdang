<template>
    <div id="my">
        <div class="myHom">
        <!--背景-->
            <div class="bacRed">
            </div>
        <!--内容-->
            <div class="content">
            <!--设置、消息-->
                <router-link to="/return">
                    <span class="mui-icon mui-icon-gear"  style="color:#fff"></span>&nbsp;
                </router-link>
                <span class="mui-icon mui-icon-chatboxes-filled">
                    <span class="mui-badge">0</span>
                </span>
            </div>   
            <!--头像一栏-->
            <div class="useHea">
                <img :src="this.img" alt="">
            </div>
            <div class="useCon">
                <p>
                    <span class="uname">
                    <router-link :to="jamPag">
                        {{uname}}
                    </router-link>
                       
                    </span>
                    <span class="numTyp">普通会员</span>
                </p>
                <div class="sain">签到领银铃铛></div>
            </div>
            <div class="discount">
            <!--礼券-->
                <ul type="none">
                    <li>
                        <router-link to="">
                            <p>1</p>
                            <p>礼券</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <p>30</p>
                            <p>银铃铛</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <p>1</p>
                            <p>礼品卡</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <p>0.0</p>
                            <p>余额</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <p>0</p>
                            <p>金铃铛</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        <!--标签卡-->
            <div class="barcard">
                <ul type="none">
                    <li>
                        <router-link to="">
                            <p class="p1">
                                <span class="mui-icon mui-icon-extra mui-icon-extra-prech"></span>
                            </p>
                            <p class="p2">待付款</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <p class="p1">
                                <span class="mui-icon mui-icon-extra mui-icon-extra-express"></span>
                            </p>
                            <p class="p2">待收货</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <p class="p1">
                                <span class="mui-icon mui-icon-extra mui-icon-extra-topic"></span>
                            </p>
                            <p class="p2">待评价</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <p class="p1">
                                <span class="mui-icon mui-icon-extra mui-icon-extra-regist"></span>
                            </p>
                            <p class="p2">退款/售后</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="">
                            <p class="p1">
                                <span class="mui-icon mui-icon-extra mui-icon-extra-order"></span>
                            </p>
                            <p class="p2">全部订单</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                uname:"登录/注册",
                jamPag:"/login",
                img:"http://wangfengxiang.applinzi.com/img/useHea/100.jpg",
                sex:0
            }
        },
        methods:{
            //判断是否登录，显示
            justify(){
                var uname=sessionStorage.getItem("uname");
                var img=sessionStorage.getItem("img");
                var sex=sessionStorage.getItem("sex");
                if(uname!=null){
                    this.uname=uname;
                    this.jamPag="/myhom";
                    this.img="http://wangfengxiang.applinzi.com/"+img;
                    this.sex=sex;
                }
            }
        },
        created(){
            this.justify()
        }
    }
</script>
<style>
    #my{
        margin-top:-40px;  
    }
    #my .myHom{
        width:320px;
        height:300px;
        position:relative;
    }
    #my .myHom .bacRed{
        position:absolute;
        left:0px;
        top:0px;
        width:100%;
        height:250px;
        background-image:linear-gradient(90deg,#f00 0%,#fd1f79 100%);
        border-radius:0 0 10% 10%;
    }
    #my .myHom .barcard{
        border-radius:6px;
        height:70px;
        width:290px;
        background:#fff;
        position:absolute;
        top:200px;
        margin:0 15px;
        box-shadow:1px 1px 1px 1px #928c8c;
    }
    #my .myHom .content{
        color:#fff;
        position:absolute;
        top:10px;
        right:10px;
    }
    #my .myHom .content .mui-badge{
        background:#fff;
        color:#f00;
    }
    #my .myHom .useHea{
        width:60px;
        height:60px;
        position:absolute;
        left:20px;
        top:40px;
        border:3px solid #fff;
        border-radius:50%;
        overflow:hidden;
    }
    #my .myHom .useHea img{
        width:60px;
    }
    #my .myHom .useCon{

    }
    #my .myHom .discount{
        margin:0 auto;
        padding:0 20px;
        width:100%;
        position:absolute;
        top:100px;
    }
    #my .discount ul{
        padding:0;
        width:100%;
        display:flex;
    }
    #my .discount ul li{
        margin:0 !important;
        width:20%;
        margin:0 5px;
    }
    #my .discount ul p{
        text-align:center;
        width:100%;
        color:#fff;
    }
    #my .barcard ul{
        padding:0;
        width:100%;
        height:30px;
        display:flex;
        justify-content:space-around;
    }
    #my .barcard ul li{
        height:20px;
        text-align:center;
    }
    #my .barcard ul li p{
        margin:0;
    }
    #my .barcard ul li .p1{
        color:#f00;
    }
    #my .barcard ul li .p2{
        color:#000;
        font:12px "等线体";
    }
    #my .useCon{
        width:220px;
        height:50px;
        position:absolute;
        top:50px;
        left:90px;
    }
    #my .useCon .uname{
        font:bold 17px "等线体";
        color:#fff !important;
    }
    #my .useCon .numTyp{
        font:bold 10px "等线体";
        color:#fff;
        border-radius:3px;
        background:#ff9800;
        padding:1px;
        margin-left:5px;
    }
    #my .useCon .uname a{
        color:#fff;  
    }
    
    #my .useCon .sain{
        width:105px;
        height:20px;
        font:bold 10px "等线体";
        color:#fff;
        border-radius:10px;
        background:rgba(0,0,0,.3);
        padding:1px 10px 1px 10px;
        margin-left:5px; 
    }
</style>