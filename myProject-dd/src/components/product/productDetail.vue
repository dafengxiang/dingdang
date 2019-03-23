<template>
    <div class="detail">
        <header class="mui-bar mui-bar-nav" id="detailHead">
			<a class=" mui-icon mui-icon-left-nav" @click="reto"></a>
			<span>商品详情</span>
		</header>
        <div class="btn">
            <button id="btn1">立即购买</button>
            <button id="btn2" @click="addcart" :data-pid="item.pid">加入购物车</button>
        </div>
        <div class="bor">
            <!--轮播图-->
            <mt-swipe class="banner">
                <mt-swipe-item v-for="(p,i) of list" :key="i" class="item">
                    <img :src='"http://wangfengxiang.applinzi.com/"+p.lg'>
                </mt-swipe-item>
            </mt-swipe>
<!--商品详情-->
            <h3>￥21.00</h3>
            <h5>定价<s>￥42.00</s>&nbsp;&nbsp;5折</h5>
            <span class="bacSty">叮东自营</span>
            <span class="tit">{{item.title}}</span>
            <div class="mui-content" :style="'height:'+height+'px'">
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed">
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                   <p>{{item.detail}}</p> 
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                  <p>作者&nbsp;&nbsp;<span>{{item.ath}}</span><router-link class="more" to="#">查看作品 <span class="mui-icon mui-icon-forward"></span></router-link></p>
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <p>出版&nbsp;&nbsp; 
                                <span>{{item.pubstore}}，    </span>
                                <span>{{item.pubdata|datCha}}</span>
                                <router-link class="more" to="#">查看作品 
                                    <span class="mui-icon mui-icon-forward"></span>
                                </router-link>
                            </p>
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
                            <p>分类&nbsp;&nbsp; 
                                <span>图书&gt;{{item.pfamily|famCha}}</span>
                                <router-link class="more" to="#"> 
                                    <span class="mui-icon mui-icon-forward"></span>
                                </router-link>
                            </p>
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                   <p>书评&nbsp;&nbsp; 
                                <svg width="15" height="15" v-for="(r,i) of redStar">
                                    <polyline points="0,5 5,5 7.5,0 10,5 15,5 11,8 13,15 7.5,11 2,15 4,8 0,5" fill="red" :key="i"></polyline>
                                </svg>
                                <svg width="15" height="15">
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" style="stop-color:rgb(255,0,0)"/>
                                            <stop :offset="pre+'%'" style="stop-color:rgb(255,0,0)"/>
                                            <stop :offset="pre+'%'" style="stop-color:rgb(223,223,223)"/>
                                            <stop offset="100%" style="stop-color:rgb(223,223,223)"/>
                                        </linearGradient>
                                    </defs> 
                                    <polyline points="0,5 5,5 7.5,0 10,5 15,5 11,8 13,15 7.5,11 2,15 4,8 0,5" fill="url(#grad1)"></polyline>
                                </svg>
                                <svg width="15" height="15" v-for="(r,i) of blaStar">
                                    <polyline points="0,5 5,5 7.5,0 10,5 15,5 11,8 13,15 7.5,11 2,15 4,8 0,5" fill="rgb(223,223,223)" :key="i"></polyline>
                                </svg>
                                &nbsp;<span style="color:red">{{comment}}</span>
                                <router-link class="more" to="#">更多精彩作品 
                                    <span class="mui-icon mui-icon-forward"></span>
                                </router-link>
                           </p>
		                </div>
		            </div>
		        </li>
		    </ul>
            <div :class="icon" class="chaIco" @click="heiCha"></div>
		</div>
        </div>
<!--促销-->
        <div class="mui-content">
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed"  style="padding-right:15px">
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <router-link to="/home">
                                <b>文艺好书5折封顶，点击这里进入会场&gt;&gt;</b> 
                            </router-link> 
		                </div>
                        <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-icon mui-icon-forward more"></span>
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <p>
                                <div style="float:left">
                                    <p>
                                       促销 
                                    </p>
                                </div>
                                &nbsp;
                                <span style="display:inline-block"> 
                                    <output class="hkk">限时抢</output> <span>&nbsp;现在购买享受￥10.50...</span><br>
                                    <output class="hkk">加价购</output> <span>&nbsp;加9.90元换购热销商品</span>
                                </span>  
                            </p>
                            
		                </div>
		                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-icon mui-icon-forward more"></span>
		                </div>
		            </div>
		        </li> 
		    </ul>
		</div>
<!--配送-->
        <div class="mui-content">
		    <ul class="mui-table-view mui-table-view-striped mui-table-view-condensed"  style="padding-right:15px">
		        <li class="mui-table-view-cell">
		           <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <p>
                                <div style="float:left">
                                    <p>送至
                                        <output class="mui-icon mui-icon-location-filled"></output>
                                    </p>
                                </div>
                                <span></span>
                                <span style="font-size:2px;color:#000;display:inline-block">
                                    <p style="font-size:10px;color:#000;">北京>北京市>顺义区</p>
                                    <p style="color:red;font-size:10px">22:45前下单，预计明天送达</p>
                                    <p style="font-size:10px;color:#000;">运费6元，满49包邮</p>
                                </span>
                            </p>
		                </div>
		                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-icon mui-icon-forward more"></span>
		                </div>
		            </div>
		        </li>
		        <li class="mui-table-view-cell">
		            <div class="mui-table">
		                <div class="mui-table-cell mui-col-xs-10">
		                    <p>
                                <div style="float:left">
                                    <p>
                                        服务&nbsp;  
                                    </p>
                                </div>
                                <div style="float:left">
                                <span><span class="mui-icon-extra mui-icon-extra-calendar" style="color:red"></span>叮当发货&售后</span>&nbsp;
                                <span><span class="mui-icon-extra mui-icon-extra-calendar" style="color:red"></span>正品保障</span><br>
                                <span><span class="mui-icon-extra mui-icon-extra-calendar" style="color:red"></span>支持礼品卡</span>&nbsp;
                                <span><span class="mui-icon-extra mui-icon-extra-calendar" style="color:red"></span>无理由退货</span><br>
                                <span><span class="mui-icon-extra mui-icon-extra-calendar" style="color:red"></span>礼品包装</span>&nbsp;
                                </div>   
                            </p>   
		                </div>
		                <div class="mui-table-cell mui-col-xs-2 mui-text-right">
		                    <span class="mui-icon mui-icon-forward more"></span>
		                </div>
		            </div>
		        </li> 
		    </ul>
		</div>
<!--评论-->

    </div>
</template>
<script>
import {Toast} from "mint-ui"
    export default{
        data(){
            return{
                list:[],
                item:[],
                comment:0,
                redStar:[],
                blaStar:[],
                pre:0,
                icon:"mui-icon mui-icon-arrowdown",
                height:97,
            }
        },
        methods:{
            heiCha(){
                if(this.height==97){
                    this.height=324;
                    this.icon="mui-icon mui-icon-arrowup"
                }else{
                    this.height=97;
                    this.icon="mui-icon mui-icon-arrowdown";
                }
            },
            getList(){
                var url="http://wangfengxiang.applinzi.com/getdetail?pid="+this.$route.query.pid;
                this.axios.get(url).then(res=>{
                    this.list=res.data.data;
                    this.item=this.list[0];
                    this.comment=this.item.comSco;
                    var n=this.comment;
                    var i=Math.floor(n/2);
                    var j=4-i;
                    for(var a=0;a<i;a++){
                        this.redStar.push(a)
                    };
                    for(var b=0;b<j;b++){
                        this.blaStar.push(b)
                    };
                    if(n%2)this.pre=50;
                    })
            },
            reto(){
				history.go(-1);
			},
            addcart(e){
                var pid=e.target.dataset.pid;
                var uid=sessionStorage.getItem("uid");
                var postData=this.qs.stringify({
                    pid,
                    uid
                })
                var url="http://wangfengxiang.applinzi.com/addcart";
                this.axios.post(url,postData).then(res=>{
                    Toast("添加成功");
                    if(res.data.code==3)this.$store.commit("increment");
                })
            }
        },
        created(){
            this.getList(); 
        },
    }
</script>
<style>
    #detailHead span{
		display:inline-block;
		margin:0 90px;
		color:#fff;
	}
	#detailHead a{
		color:#fff;
	}
    .detail .banner{
        height:306px;
    }
    .detail .banner img{
        height:100%;
    }
    .detail .bor{
        width:100%;
        background:#fff;
        padding:10px;
    }
    .detail h3{
        color:#f00;
    }
    .detail .hkk{
        border-radius:2px;
        font-size:10px;
        color:red;
        border:1px solid red;
        font-weight:400 !important;
    }
    .detail h5{
        margin-top:10px;
    }
    .detail .bacSty{
        border-radius:3px;
        background:#f00;
        padding:3px;
        font:11px "黑体";
        color:#fff;
    }
    .detail .tit{
        font:bold 18px "黑体";
    }
    .detail .mui-table .mui-table-cell span{
        font-weight:bold;
        font-size:10px;
        color:#000;
    }
    .detail .mui-table .more{
        float:right;
    }
    .detail .mui-table a b{
        font-size:10px;
        color:red;
    }
    .detail .secFlo{
        padding-top:0px !important;
    }
    .detail .mui-content ul{
        margin-top:0px !important;
        margin-bottom:10px !important;
    }
    .detail .bor{
        padding-bottom:0px;
        margin-bottom:17px;
        position:relative;
    }
    .detail .mui-bar-nav .mui-content{
        padding-top:0px !important;
    }
    .detail .mui-content{  
        overflow:hidden;
        padding-top:0px !important;
    }
    .detail .chaIco{
        height:18px;
        background:#fff;
        border-radius:50%;
        position:absolute;
        left:130px;
        bottom:-8px;
    }
    .btn{
        border-radius:30px;
        overflow:hidden;
        width:174px;
        position:fixed;
        left:134px;
        bottom:50px;
        z-index:20;
        display:flex;
    }
    #btn1{
        background:#ffc107;
        border:none;
        width:50%;
    }
    #btn2{
        background:#f00;
        border:none;
        width:50%;
    }
</style>