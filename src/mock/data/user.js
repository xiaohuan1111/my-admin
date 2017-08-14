import Mock from 'mockjs';

const LoginUsers = [
	{
		id : 1,
		username : 'admin',
		password : '123456',
		avatar : 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
		name : '张某某'
	}
];

const Users = [];

for (let i = 0; i < 86; i++){
	Users.push(Mock.mock({
		'id' : '@guid',
		'name' : '@cname',
		'addr' : '@county(true)',
		'age|18-60' : 100,
		'birth' : '@date',
		'sex' : '@integer(0, 1)'
	}));
}

export { LoginUsers, Users };