<template>
	<div id="table">
		 <!-- 工具条 -->
		 <el-col :span="24" class="toolbar">
		 	<el-form :inline="true" :model="filters">
		 		<el-form-item>
		 			<el-input placeholder="姓名" v-model="filters.name"></el-input>
		 		</el-form-item>
		 		<el-form-item>
		 			<el-button type="primary" @click="getUsers">查询</el-button>
		 		</el-form-item>
		 		<el-form-item>
		 			<el-button type="primary" @click="handleAdd">新增</el-button>
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

		 <!-- 对话框 -->
		 <el-dialog title="新增" v-model="addFormVisible" :close-on-click-model="false" style="text-align:left;">
		 	<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
		 		<el-form-item label="姓名" prop="name">
		 			<el-input v-model="addForm.name" auto-complete="off"></el-input>
		 		</el-form-item>
		 		<el-form-item label="性别">
		 			<el-radio-group v-model="addForm.sex">
		 				<el-radio :label='1'>男</el-radio>
		 				<el-radio :label='0'>女</el-radio>
		 			</el-radio-group>
		 		</el-form-item>
		 		<el-form-item label="年龄">
		 			<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
		 		</el-form-item>
		 		<el-form-item label="生日">
		 			<el-date-picker type="date" v-model="addForm.birth" placeholder="请选择日期"></el-date-picker>
		 		</el-form-item>
		 		<el-form-item label="地址">
		 			<el-input typp="textarea" v-model="addForm.addr"></el-input>
		 		</el-form-item>
		 	</el-form>
		 	<div slot="footer" class="dialog-footer">
		 		<el-button @click="addFormVisible = false">取消</el-button>
		 		<el-button type="primary" @click="addsubmit('addForm')" :loading="addloading">确定</el-button>
		 	</div>
		 </el-dialog>
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
				listLoading: false,
				addFormVisible: false, // 新增界面是否显示
				addloading: false,
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				addFormRules: {
					name:[
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				}
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
			// 获取用户列表
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
			},
			// 新增用户

			handleAdd: function(){
				this.addFormVisible = true
			},
			addsubmit: function(formname){
				this.$refs[formname].validate((valid) =>{
					if(valid){
						this.$confirm('确认提交吗？','提示',{}).then(()=>{
							this.loading = true,
							this.$message({
								type: 'success',
								message: '新增成功！'
							})
						}).catch(()=>{
							this.$message({
								type:'info',
								message: '新增失败！'
							})
						})
					}
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