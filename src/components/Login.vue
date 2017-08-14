<template>
	<div id="login">
		<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm login-container">
		    <h3 class="title">登录系统</h3>
			<el-form-item  prop="account">
				<el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"placeholder="密码"></el-input>
			</el-form-item>
			<el-checkbox class="remember" v-model="checked" checked >记住密码</el-checkbox>
			<el-form-item>
				<el-button type="primary" style="width:100%;" @click.native.prevent="submitForm('ruleForm2')" :loading="logining" >提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { requestLogin } from '../api/api';
	export default{
		data(){
			return{
				logining: false,
				ruleForm2 : {
					account : '',
					checkPass : ''
				},
				rules2 : {
					account : [
						{required : true , message : '请输入用户名',trigger: 'blur' }
					],
					checkPass : [
						{required : true , message : '请输入密码', trigger : 'blur'}
					]
				},
				checked : true
			}
		},
		methods : {
			submitForm(ev){
				var _this = this;
				this.$refs.ruleForm2.validate((value) => {
					this.logining = true;
					if(value){
						var loginParams = {username: this.ruleForm2.account, password: this.ruleForm2.checkPass};
						requestLogin(loginParams).then( data =>{
							this.logining = false;
							let {code , msg , user} = data;
							if(code !== 200){
								this.$message({
									message : msg,
									type : 'error'
								})
							}else{
								sessionStorage.setItem('user',JSON.stringify(user));
								this.$router.push({path : '/table'});
							}
						})
					}else{
						console.log('error submit');
						return false;
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.login-container{
			width:350px;
			margin:180px auto;
			padding: 35px 35px 15px 35px;
			background-color:#fff;
			border:1px solid #eaeaea;
			box-shadow: 0 0 25px #cac6c6;
			border-radius: 5px;
			.title{
				margin: 0 auto 40px auto;
				text-align: center;
				color:#505458;
			}
			.remember{
				margin:0 0 35px 0;
				width:100%;
				text-align: left;
			}
	}
</style>