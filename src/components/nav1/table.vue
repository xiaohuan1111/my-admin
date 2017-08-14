<template>
	<div id="table">
		 <!-- 工具条 -->
		 <el-col :span="24" class="toolbar">
		 	<el-form :inline="true" :model="filters">
		 		<el-form-item>
		 			<el-input placeholder="姓名" v-model="filters.name"></el-input>
		 		</el-form-item>
		 		<el-form-item>
		 			<el-button type="primary">查询</el-button>
		 		</el-form-item>
		 		<el-form-item>
		 			<el-button type="primary">新增</el-button>
		 		</el-form-item>
		 	</el-form>
		 </el-col>
		 <!-- table -->
		 <el-table :data="users"  highlight-current-row fit  v-loading="listLoading" style="width:100%;">
		 	<el-table-column type="selection" width="55"></el-table-column>
		 	<el-table-column type="index" width="55"></el-table-column>
		 	<el-table-column prop="name" label="姓名" width="120" ></el-table-column>
		 	<el-table-column prop="gander" label="性别" width="100" sortable :formatter="formatSex"></el-table-column>
		 	<el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
		 	<el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
		 	<el-table-column prop="addr" label="地址" ></el-table-column>
		 	<el-table-column label="操作" width="150">
		 		<template scope="scope">
		 			<el-button size="small" @click="handleEdit(scope.$index , scope.row)">编辑</el-button>
		 			<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		 		</template>
		 	</el-table-column>
		 </el-table> 
		 <!-- 工具条分页 -->
		 <el-col :span="24" class="toolbar">
		 	<el-button type="danger">批量删除</el-button>
		 	<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;"></el-pagination>
		 </el-col>
	</div>
</template>
<script>
	import { getUserListPage } from '@/api/api'
	export default{
		data(){
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false
			}
		},
		methods: {
			formatSex : function(row, column){
				return row.sex == 1 ? '男': row.sex == 0 ? '女':'未知'
			},
			handleEdit(index, row){
				// console.log(index, row);
			},
			handleDelete(index, row){
				// console.log(index, row)
			},
			handleCurrentChange(val) {
        		this.page = val ;
        		this.getUsers();
      		},
			//获取用户列表
			getUsers(){
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				getUserListPage(para).then((res) => {
					console.log(res)
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
				})
			}
		},
		mounted(){
			this.getUsers();
		}
	}
</script>
<style lang="scss">
	#table{
		width:100%;
		.toolbar{
			background-color:#f2f2f2;
			text-align: left;
			padding:10px;
			margin:10px 0;
			.el-form-item{
				margin-bottom:0;
			}
		}
	}
</style>