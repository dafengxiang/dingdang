<template>
    <div class="family">
		<header class="mui-bar mui-bar-nav" id="familyHead">
			<a class=" mui-icon mui-icon-left-nav" @click="reto"></a>
			<span>分类表</span>
		</header>
		<!--分类主体-->
		<div>
			<div class="box" :style="'margin-left:'+marLef+'px'"  ref="bar">
			    <div class="outer" :style="'left:'+ tLef +'px'">
					<span class="inner"></span>
				</div>
				<span v-for="(item,i) of list" :class="item.claNam" @click="change" :data-id="item.id" :data-pf="item.checked">
					{{item.content}}
				</span>	
			</div>
			<div class="content">
				<div class="detail" v-for="(item,i) of prolist" :key="i">
					<div class="idnam">{{i+1}}</div>
					<div class="product">
						<div class="img">
						<img :src="'http://wangfengxiang.applinzi.com/'+item.lg" :data-pid="item.pid" @click="jump">
						</div>
						<div class="con">
							<p class="title">{{item.title}}</p>
							<p class="ath">{{item.ath}}</p>
							<p class="pub">{{item.pubstore}}</p>
							<p class="script">
								<span class="borRed w">当当自营</span>&nbsp;
								<span class="borRed r">每满100-50</span>
							</p>
							<p class="price">￥{{item.price.toFixed(2)}} <span class="mui-icon mui-icon-extra mui-icon-extra-cart cart" :data-pid="item.pid"  @click="addcart"></span></p>
							<p class="comment">
								<svg width="15" height="15" v-for="(r,i) of item.redStar" style="vertical-align:middle">
                                    <polyline points="0,5 5,5 7.5,0 10,5 15,5 11,8 13,15 7.5,11 2,15 4,8 0,5" fill="red" :key="i"></polyline>
                                </svg>
                                <svg width="15" height="15" style="vertical-align:middle">
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" style="stop-color:rgb(255,0,0)"/>
                                            <stop :offset="item.pre+'%'" style="stop-color:rgb(255,0,0)"/>
                                            <stop :offset="item.pre+'%'" style="stop-color:rgb(223,223,223)"/>
                                            <stop offset="100%" style="stop-color:rgb(223,223,223)"/>
                                        </linearGradient>
                                    </defs> 
                                    <polyline points="0,5 5,5 7.5,0 10,5 15,5 11,8 13,15 7.5,11 2,15 4,8 0,5" fill="url(#grad1)"></polyline>
                                </svg>
                                <svg width="15" height="15" v-for="(r,i) of item.blaStar" style="vertical-align:middle">
                                    <polyline points="0,5 5,5 7.5,0 10,5 15,5 11,8 13,15 7.5,11 2,15 4,8 0,5" fill="rgb(223,223,223)" :key="i"></polyline>
                                </svg>&nbsp;
							   	<span style="vertical-align:middle;color:#f00">{{item.comSco}}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default{	
        data(){
            return{
				list:[
					{id:1,content:"畅销书",claNam:"clitle",checked:"rx"},
					{id:2,content:"童书榜",claNam:"tle",checked:"ts"},
					{id:3,content:"新书榜",claNam:"tle",checked:"rx"},
					{id:4,content:"小说榜",claNam:"tle",checked:"xs"},
					{id:5,content:"特卖",claNam:"tle",checked:"rx"},
					{id:6,content:"电子书",claNam:"tle",checked:"dz"},
				],
				prolist:[],
				marLef:0,
				tLef:32
			}
        },
		methods:{
			//判断连接，触发事件的
			justify(){
				var pf=this.$route.query.pid;
				if(!pf){
					this.getList("rx");
				}else{
					this.getList(pf)
				}
			},
			//添加购物车
			 addcart(e){
					var pid=e.target.dataset.pid;
					var uid=sessionStorage.getItem("uid");
					if(uid==null){
						Toast("请先登录")
					}else{
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
			//回退 
			reto(){
				history.go(-1);
			},
			//跳转详情页
			jump(e){
				var pid=e.target.dataset.pid;
				var str="?pid="+pid;
				this.$router.push("/detail"+str)
			},
			//改变导航栏样式
			change(e){
				var id=e.target.dataset.id-1;
				var pf=e.target.dataset.pf;
				for(var item of this.list){
					item.claNam="tle";
				}
			   //触发获取类表函数
				this.getList(pf);
				this.list[id].claNam="clitle";
				if(id>1){
					this.marLef=-((id-3)*82+130);
					this.tLef=-((id-3)*82+114);
					this.tLef=32+id*82;
					if(this.marLef<-170){
						this.marLef=-170;
					}
				}else{
					this.marLef=0;
					this.tLef=32+id*82;
				}
			},
			//获取商品分类表
			getList(pf){
				var url="http://wangfengxiang.applinzi.com/getList?pf="+pf;
				this.axios.get(url).then(res=>{
						this.prolist=res.data.data;
					//循环华星星
						for(var item of this.prolist){
							var n=item.comSco;
							item.redStar=[];
							item.blaStar=[];
							var i=Math.floor(n/2);
							var j=4-i;
					//红星类表
							for(var a=0;a<i;a++){
								item.redStar.push(a)
							};
					//黑星列表
							for(var b=0;b<j;b++){
								item.blaStar.push(b)
							};
							if(n%2)item.pre=50;
							} })
						}
				},
				created() {
					this.justify();
				},
			}
	
</script>
<style>
    #familyHead span{
		display:inline-block;
		margin:0 100px;
		color:#fff;
	}
	#familyHead a{
		color:#fff;
	}
	.family .box{
		position:relative;
		font:bold 14px "等线体";
		width:500px;
	}
	.family .tle{
		width:82px;
		background:#fff;
		display:inline-block;
		margin-top:10px;
		border-top:1px solid #ddd;
		border-bottom:1px solid #ddd;
		padding:10px 20px;
	}
	.family .inner{
		position:absolute;
		top:-4px;
		left:-6px;
		border-left:6px solid transparent;
		border-right:6px solid transparent;
		border-top:6px solid transparent;
		border-bottom:6px solid #fff;
	}
	.family .outer{
		position:absolute;
		top:36px;
		width:10px;
		border-left:8px solid transparent;
		border-right:8px solid transparent;
		border-top:8px solid transparent;
		border-bottom:8px solid #ddd;
	}
	.family .clitle{
		width:82px;
		background:#fff;
		color:#f00;
		display:inline-block;
		margin-top:10px;
		border-top:1px solid #ddd;
		border-bottom:1px solid #ddd;
		padding:10px 20px;
	}
	.family .content{
		width:100%;
	}
	.family .content .detail{
		background:#fff;
		height:195px;
		border-bottom:1px solid #ddd;
	}
	.family .content .detail .idnam{
		font:12px "等线体";
		color:#fff;
		background:#f00;
		width:20px;
		height:15px;
		text-align:center;
	}
	.family .content .product{
		width:100%;
		height:167px;
		padding:0 10px 5px 10px;
	}
	.family .content .product .img{
		float:left;
		margin:10px 0;
	}
	.family .content .product img{
		width:100px;
		height:125px;
	}
	.family .content .product .con{
		float:left;
		width:198px;
		padding:5px;
	}
	.family .content .product p{
		width:100%;
		overflow:hidden;
		margin:5px;
	}
	.family .content .product .title{
		font:bold 14px "等线体";
		color:#000;
		height:36px;
	}
	.family .content .product .ath,.pub,.comment{
		font:10px "等线体";
		height:16px;
	}
	.family .content .product .borRed{
		border:1px solid #f00;
		border-radius:3px;
		font:bold 10px "等线体";
	}
	.family .content .product .w{
		background:#fff;
		color:#f00;
	}
	.family .content .product .r{
		background:#f00;
		color:#fff;
	}
	.family .content .product .price{
		color:#f00;
		font:bold 18px "等线体";
	}
	.family .content .product .cart{
		float:right;
		border:1px solid #ddd;
		border-radius:2px;
		padding:2px;
	}
</style>
<!--
	<style>
		.mui-control-content {
			background-color: white;
			min-height: 215px;
		}
		.mui-control-content .mui-loading {
			margin-top: 50px;
		}
	</style>

	<script>
		mui.init({
			swipeBack: false
		});
		(function($) {
			$('.mui-scroll-wrapper').scroll({
				indicators: true //是否显示滚动条
			});
			var html2 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第二个选项卡子项-1</li><li class="mui-table-view-cell">第二个选项卡子项-2</li><li class="mui-table-view-cell">第二个选项卡子项-3</li><li class="mui-table-view-cell">第二个选项卡子项-4</li><li class="mui-table-view-cell">第二个选项卡子项-5</li></ul>';
			var html3 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第三个选项卡子项-1</li><li class="mui-table-view-cell">第三个选项卡子项-2</li><li class="mui-table-view-cell">第三个选项卡子项-3</li><li class="mui-table-view-cell">第三个选项卡子项-4</li><li class="mui-table-view-cell">第三个选项卡子项-5</li></ul>';
			var item2 = document.getElementById('item2mobile');
			var item3 = document.getElementById('item3mobile');
			document.getElementById('slider').addEventListener('slide', function(e) {
				if (e.detail.slideNumber === 1) {
					if (item2.querySelector('.mui-loading')) {
						setTimeout(function() {
							item2.querySelector('.mui-scroll').innerHTML = html2;
						}, 500);
					}
				} else if (e.detail.slideNumber === 2) {
					if (item3.querySelector('.mui-loading')) {
						setTimeout(function() {
							item3.querySelector('.mui-scroll').innerHTML = html3;
						}, 500);
					}
				}
			});
			var sliderSegmentedControl = document.getElementById('sliderSegmentedControl');
			$('.mui-input-group').on('change', 'input', function() {
				if (this.checked) {
					sliderSegmentedControl.className = 'mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-segmented-control-' + this.value;
					//force repaint
					sliderProgressBar.setAttribute('style', sliderProgressBar.getAttribute('style'));
				}
			});
		})(mui);
	</script>
-->