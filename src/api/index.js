import ajax from './ajax';

//登录
export const reqLogin = (user) => ajax('/login',user,'POST');
//注册
export const reqRegister = (user) => ajax('/register',user,'POST');
//获取登录用户信息(包含user账号信息)
export const reqUserInfo = (username) => ajax('/userInfo',username,'POST');
//获取用户信息（userInfo信息）
export const reqGetUserInfoData = (id) => ajax('/getUserInfoData',id,'POST');
//上传头像
export const reqUploadAvatar = (avatar) => ajax('/avatar/img/upload',avatar,'POST');
//上传公司logo
export const reqUploadLog = (logo) => ajax('/company/logo/upload',logo,'POST');
//注册更新用户信息
export const reqUserInfoUpdate = (userInfo) => ajax('/userInfoUpdate',userInfo,'POST');
//上传头像成功后删除原头像
export const reqDeleteAvatar = (imgName) => ajax('/avatar/img/delete',imgName,'POST');
//获取公司名字
export const reqSearchCompany = (name) => ajax('/searchCompany',name,'POST');
//获取公司名字
export const reqGetCompany = (data) => ajax('/getCompany',data,'POST');
//设置公司
export const reqSetCompany = (data) => ajax('/setCompany',data,'POST');
//获取所有的岗位
export const reqGetJobs = () => ajax('/getJobs',{},'POST');
//发布岗位
export const reqPostJob = (data) => ajax('/postJob',data,'POST');
//发布招聘岗位
export const reqPostRequire  = (data) => ajax('/postRequire',data,'POST');
//获取所有招聘岗位
export const reqGetEmployerList  = (data) => ajax('/getEmployerList',data,'POST');
//获取所有求职者
export const reqGetEmployeeList  = (data) => ajax('/getEmployeeList',data,'POST');
//获取所有公司信息
export const reqGetAllCompany  = () => ajax('/getAllCompany',{},'POST');
//上传动态图片
export const reqUploadSpace = (space)=>ajax('/space/img/upload',space,'POST');
//发布动态
export const reqPostSpace = (data)=>ajax('/postSpace',data,'POST');
//获取动态
export const reqGetSpace = (data)=>ajax('/getSpace',data,'POST');
//获取用户聊天记录
export const reqMsgList = (id) => ajax('/getMsgList',id,'POST')
//将信息修改为已读
export const reqReadMsg = (from) => ajax('/readMsg',from,'POST');
//切换用户身份
export const reqChangeStatus = (data) => ajax('/changeStatus',data,'POST');