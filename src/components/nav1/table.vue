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
		<el-table :data="users"  highlight-current-row fit  v-loading="listLoading" @selection-change='selsChange' style="width:100%;">
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
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length === 0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;"></el-pagination>
		</el-col>

		<!-- 新增界面 -->
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
				<el-button type="primary" @click="addSubmit('addForm')" :loading="addLoading">确定</el-button>
			</div>
		</el-dialog>
		
		<!-- 编辑界面 -->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-model="false" style="text-align:left;">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio :label='1'>男</el-radio>
						<el-radio :label='0'>女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" v-model="editForm.birth" placeholder="请选择日期"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input typp="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit('editForm')" :loading="editLoading">确定</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	import util from '../../common/js/util'
	import { getUserListPage , addUser, editUser, removeUser, batchRemove} from '@/api/api'
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
				addLoading: false,
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
				},
				editFormVisible: false, // 编辑界面是否显示
				editLoading: false,
				editForm: {
					id:0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				editFormRules: {
					name:[
					{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				sels:[] // 选中列表
			}
		},
		methods: {
			formatSex : function(row, column){
				return row.sex == 1 ? '男': row.sex == 0 ? '女':'未知'
			},
			handleEdit(index, row){
				this.editFormVisible = true;
				this.editForm = Object.assign({},row);
			},
			handleDelete(index, row){
				this.$confirm('您确认删除该记录吗？','提示',{
					type:'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {id: row.id}
					removeUser(para).then((res) => {
						this.$message({
							type:'success',
							message: res.data.msg
						});
						this.getUsers();
					})
				})
			},
			batchRemove: function(){
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('您确认删除吗?',"提示",{
					type: 'waring'
				}).then(() => {
					this.listLoading = true;
					let para = {ids: ids};
					batchRemove(para).then((res) => {
						this.$message({
							type: 'success',
							message: res.data.msg
						});
						this.listLoading = false;
						this.getUsers();
					})
				})
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
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
				})
			},
			// 新增用户
			handleAdd: function(){
				this.addFormVisible = true
			},
			addSubmit: function(formname){
				this.$refs[formname].validate((valid) =>{
					if(valid){
						this.addLoading = true;
						let para = Object.assign({}, this.addForm);
						para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(para.birth);
						addUser(para).then((res) => {
							this.addLoading = false;
							this.$message({
								message: '提交成功！',
								type: 'success'
							});
							this.$refs[formname].resetFields();
							this.addFormVisible = false;
							this.getUsers();
						})
					}
				})
			},

			// 编辑用户
			editSubmit: function(formname){
				this.$refs[formname].validate((valid) => {
					if(valid){
						this.editLoading = true;
						let para = Object.assign({},this.editForm);
						editUser(para).then((res) => {
							this.editLoading = false;
							this.$message({
								message: res.data.meg,
								type: 'success'
							});
							this.$refs[formname].resetFields();
							this.editFormVisible = false;
							this.getUsers();
						})
					}
				})
			},

			//批量删除
			selsChange: function(sels){
				this.sels = sels;
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