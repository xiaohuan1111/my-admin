import axios from 'axios';

let base = '';
/*原文档 使用的axios请求地址为'${base}/login'存在疑问？？？？*/
export const requestLogin = params => {return axios.post('/login',params).then(res => res.data);} ;
export const getUserList = params => {return axios.get("/user/list",{params: params});};
export const getUserListPage = params => {return axios.get("/user/listpage",{params: params});}