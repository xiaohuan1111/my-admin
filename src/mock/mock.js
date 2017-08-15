import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers , Users } from './data/user';
let _Users = Users;

export default{
	bootstrap(){
		let mock = new MockAdapter(axios);

		//登录
		mock.onPost('/login').reply(config => {
			let {username , password} = JSON.parse(config.data);
			return new Promise((resolve,reject) => {
				var user = null;
				setTimeout(()=>{
					let hasUser = LoginUsers.some(u => {
						if(u.username === username && u.password === password){
							user = JSON.parse(JSON.stringify(u));
							user.password = undefined;
							return true
						}
					});
					if(hasUser){
						resolve([200,{ code : 200,msg : "请求成功" , user}]);
					}else{
						resolve([200,{ code : 500, msg : "账号或密码错误"}]);
					}
				},1000);
			});
			
		});

		//用户列表
		mock.onGet('/user/list').reply(config => {
			let {name} = config.params;
			let mockUsers = _Users.filter(user =>{
				if(name && user.name.indexOf(name) == -1) return false;
				return true;
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,{
						Users : mockUsers
					}])
				},1000)
			})
		});

		// 获取用户分页列表
		mock.onGet('/user/listpage').reply((config) => {
			let {page, name} = config.params;
			let mockUsers = _Users.filter(user => {
				if(name && user.name.indexOf(name) == -1) return false;
				return true ;
			});
			let total = mockUsers.length;
			mockUsers = mockUsers.filter((u, index) => index < 20*page && index >= 20*(page - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,{
						total : total,
						users : mockUsers
					}])
				},1000)
			})
		});

		// 新增用户
		mock.onGet('/user/add').reply((config) => {
			let {name, addr, age, birth, sex} = config.params;
			_Users.unshift({
				name: name,
				addr: addr,
				age: age,
				birth: birth,
				sex: sex
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 200,
						msg: '新增成功！'
					}])
				},100)
			})
		});

		// 编辑用户
		mock.onGet('/user/edit').reply((config) => {
			let {id, name, addr, age, birth, sex} = config.params;
			_Users.some((u) => {
				if(u.id === id){
					u.name = name;
					u.addr = addr;
					u.age = age;
					u.birth = birth;
					u.sex = sex;
					return true
				};
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,{
						code: 200,
						meg: '编辑成功！'
					}])
				},1000)
			})
		})
	}
}