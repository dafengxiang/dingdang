<template>
    <div>
        <header class="mui-bar mui-bar-nav" id="familyHead">
			<a class=" mui-icon mui-icon-left-nav" @click="reto"></a>
			<span>登录</span>
		</header>
		<div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" v-model="uname">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码" v-model="upwd" @blur="autoLogin">
				</div>
			</form>
			<form class="mui-input-group">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						自动登录
						<div id="autoLogin" :class="claNam" @click="traBtn">
							<div class="mui-switch-handle"></div>
						</div>
					</li>
				</ul>
			</form>
			<div class="mui-content-padded">
				<button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="getlogin">登录</button>
				<div class="link-area">
                    <a id='reg'>注册账号</a> 
                    <span class="spliter">|</span> 
                    <a id='forgetPassword'>忘记密码</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area">
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
         return{
             uname:"",
             upwd:"",
             claNam:"mui-switch"
         }   
        },
        methods:{
            //自动登录按钮切换
            traBtn(){
                if(this.claNam=="mui-switch")
                this.claNam="mui-switch mui-active";
                else this.claNam="mui-switch";
            },
            autoLogin(){
                if(!this.uname){
                    Toast("用户名为空！");
                }else {
                    if(!this.uname)Toast("密码为空！");
                    else if(this.claNam=="mui-switch mui-active"){
                    this.getlogin()
                }}
            },
            //回退 
			reto(){
				history.go(-1);
			},
            getlogin(){
                if(this.uname!=' '&&this.upwd!=' '){
                    var url=`http://wangfengxiang.applinzi.com/login?uname=${this.uname}&upwd=${this.upwd}`
                    this.axios(url).then(res=>{
                        if(res.data.code==1){
                            Toast("登陆成功");
                            var uid=res.data.data[0].id;
                            var img=res.data.data[0].useHea;
                            var sex=res.data.data[0].sex;
                            sessionStorage.setItem("uid",uid);
                            sessionStorage.setItem("img",img);
                            sessionStorage.setItem("sex",sex);
                            sessionStorage.setItem("uname",this.uname);
                            var url="http://wangfengxiang.applinzi.com/getcartcount?uid="+uid;
                            this.axios.get(url).then(res=>{
                               var n=res.data.data.length;
                               this.$store.commit("Count",n);
                           })
                           this.$router.push("/myhom")
                       }else{
                           Toast(res.data.msg)
                       }
                }) 
                }  
            }
        }
    }
</script>
<style>
    .mui-content{
        padding-top:10px !important;
    }
    .mui-content-padded  .mui-btn-block{
        background-color:rgba(255,0,0,0.4);
        border: 1px solid #fff;
        height:50px;
    }

</style>