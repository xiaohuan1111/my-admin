<template>
	<div id="home">
		<div class="header">
			<el-col :span="10" class="logo" :class="collapsed ? 'logo-collapse-width' : 'logo-width'">
				{{ collapsed ? '' : sysName }}
			</el-col>
			<el-col :span="10" class="tools">
				<span @click="toggleNav">
					<i class="fa fa-align-justify"></i>
				</span>
			</el-col>
			<el-col :span="4" class="userInfo">
				<div>
					<el-dropdown>
						<div class="el-dropdown-link">
							<span class="userName">{{ sysUserName }}</span><img :src="sysUserAvatar" alt="">
						</div>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>我的消息</el-dropdown-item>
							<el-dropdown-item>设置</el-dropdown-item>
							<el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</el-col>
		</div>
		<div class="main">
			<aside class="mainNav" :class="collapsed ? 'menu-collapse' : 'menu-expanded'">
				<!-- 导航菜单 -->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" 
				@open="handleOpen" 
				@close="handleClose"
				@select="handleSelect" unique-opened router v-show="!collapsed">
					<template v-for="(item, index) in $router.options.routes" v-if="!item.hidden" >
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{ item.name }}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
								{{ child.name }}
							</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf" :index="item.children[0].path"><i :class="item.iconCls" ></i>{{ item.children[0].name }}</el-menu-item>
					</template>
				</el-menu>
				<!-- 导航菜单-折叠 -->
				<ul class="el-menu collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item, index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" @mouseover="showMenu(index,true)"  @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" @click="$router.push(child.path)" :class="$route.path == child.path ? 'is-active':''">
									{{ child.name }}
								</li>
							</ul>
						</template>
						<template v-if="item.leaf">
							<ul class="el-submenu">
								<li style="padding:0 20px;height:56px;line-height:56px;padding-left:20px;min-width:0;font-size:1.1em" class="el-menu-item el-submenu__title" :class="$route.path == item.children[0].path ? 'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></li>
							</ul>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{ $route.name }}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section> 
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				collapsed : false ,
				sysName : 'MYADMIN' ,
				sysUserName : '',
				sysUserAvatar : ''
			}
		},
		methods : {
			handleOpen : function(key, keypath){
 				//console.log(key, keypath);
			},
			handleClose : function(key, keypath){
				 //console.log(key, keypath);
			},
			handleSelect : function(key, keypath){
				 //console.log(key, keypath);
			},
			toggleNav : function(){
				this.collapsed = !this.collapsed;
			},
			logout : function(){
				var _this = this;
				this.$confirm('确认退出吗？','提示',{

				}).then(() =>{
					sessionStorage.removeItem('user');
					_this.$router.push('./login');
				}).catch({

				});
			},
			showRouter : function(){
				console.log($router);
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display = status ? 'block':'none'
			}
		},
		mounted(){
			var user = sessionStorage.getItem('user');
			user = JSON.parse(user);
			if(user){
				this.sysUserName = user.name || 'name' ;
				this.sysUserAvatar = user.avatar || '';
			};
		}
	}
</script>
<style lang="scss">
	@import '../assets/css/skin.scss';
	#home{
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header{
			width:100%;
			color: #fff;
			height: 60px;
			line-height: 60px;
			background-color : $color-primary;
			.logo{ 
				text-align: left;
				height:60px;
				border-right : 1px solid #eee; 
				padding-left:20px;
				padding-right:20px;
				font-size:22px;
			}
			.tools{
				text-align: left;
				i{
					display: inline-block;
					height: 60px;
					line-height: 60px;
					width: 60px;
					text-align: center;
				}

			}
			.userInfo{
				float:right;
				text-align: right;
				.el-dropdown{
					height:60px;
					cursor: pointer;
				}

				.el-dropdown-link{
					height:60px;
					display: flex;
					justify-content: center;
					.userName{color:#fff;}
				}
				padding:0 20px;
				img{
					display: inline-block;
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin:12px 12px 12px 12px;
				}
			}
			.logo-collapse-width{ width : 60px;} 
			.logo-width{ width : 230px; }
		}
		
		.main{
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			.mainNav{
				background-color:#eee;
				text-align: left;
				.item{
					position:relative;
				}
				.submenu{
					position:absolute;
					top:0;
					left:60px;
					z-index: 999;
					display: none;
				}
				.el-menu.collapsed{
					width:60px;
				}
			}
			.content-container{
				padding: 20px;
				overflow-y: auto;
				.breadcrumb-container{
					.title{
						float: left;
					}
					.breadcrumb-inner{
						float: right;
					}
				}
			}
			.menu-collapse{
				flex:0 0 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				.el-menu{
					width:100% !important;
				}
			}
		}
	}
</style>