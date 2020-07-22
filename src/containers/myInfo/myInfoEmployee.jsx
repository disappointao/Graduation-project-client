import React, { Component } from 'react'
import { List, WhiteSpace, Button, Modal, Toast } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux';
import './myInfo.css'
import QueueAnim from 'rc-queue-anim'

import { reqGetUserInfoData, reqGetEmployeeList, reqGetSpace, reqChangeStatus } from '../../api'
import { getAge } from '../../utils'
const Item =List.Item;
const alert = Modal.alert;
function identity (time) {
	var date=new Date;
	var y = date.getFullYear();
	if(time<y){
		return '往届'
	}else if(time == y){
		return '应届'
	}else{
		return '在校学生'
	}
}
class MyInfoEmployee extends Component {
	state={
		name:"",
		age:'',
		identity:'',
		avatar:'',
		allJob:0,
		spaceNum:0
	}
	logout = ()=>{
		alert('退出','确定退出吗?',[
			{
				text:'取消',
				onPress:()=>{}
			},
			{
				text:'确定',
				onPress:()=>{
					Cookies.remove('userStatus');
					Cookies.remove('userId');
					Cookies.remove('username');
					this.props.history.replace('/')
				}
			}
		])
	}
	changeStatus = async ()=>{
		let modified = this.props.userInfo.company ? true:false;
		const response = await reqChangeStatus({username:this.state.username,status:1,modified:modified});
		const result = response.data;
		if(result.code === 0){
			Toast.success('切换成功！请重新登录',1);
			this.props.history.replace('/login');
		}
	}
	async componentDidMount(){
		const username = Cookies.get('username');
		let id = Cookies.get('userInfo');
		let userInfo = id.substring(id.indexOf('"')+1,id.lastIndexOf('"'));
		this.setState({
			userInfo:userInfo
		})
		if (!username) {
			this.props.history.replace('/login')
		}
		let infoResponse = await reqGetUserInfoData({id:userInfo});
		let infoResult = infoResponse.data.data;
		let jobResponse = await reqGetEmployeeList({userInfo:userInfo});
		let jobResult = jobResponse.data.data;
		let spaceResponse = await reqGetSpace({userInfo:userInfo});
		let spaceResult = spaceResponse.data.data;
		this.setState({
			name:infoResult.name,
			identity:identity(infoResult.graduation.split(',')[0]),
			age:getAge(infoResult.birth.split(',')[0],infoResult.birth.split(',')[1],infoResult.birth.split(',')[2]),
			avatar:infoResult.avatar,
			allJob:jobResult.length,
			spaceNum:spaceResult.length,
			username:username
		})
	}
	render () {
		const {name,age,avatar,identity,allJob,spaceNum} = this.state;
		return (
			<div id='myInfoEmployee'>
				<QueueAnim delay={200} type={'left'} >
				<div key={1} className='info-head'>
					<div className='head-img'>
						<img src={avatar?avatar:require('../../assets/img/avatar/default.jpeg')} alt=""/>
					</div>
					<div className='head-name'>
						<p>{name?name:'某某'}</p>
						<span>{identity?identity:'应届'} · {age?age:'0'}岁</span>
					</div>
					<div className='head-banner'>
						<div>
							<span>0</span>
							<p>沟通</p>
						</div>
						<div>
							<span>{this.props.unReadCount}</span>
							<p>未读</p>
						</div>
						<div>
							<span>{allJob}</span>
							<p>求职</p>
						</div>
						<div>
							<span>{spaceNum}</span>
							<p>动态</p>
						</div>
					</div>
				</div>
				<WhiteSpace/>
				<div key={2} className='info-content'>
					<List>
						<QueueAnim>
						<Item
							key={1}
							thumb={require('../../assets/img/nav/个人空间.svg')}
							arrow="horizontal"
							onClick={() => {this.props.history.push('/space')}}
						>个人空间</Item>
						<Item
							key={2}
							thumb={require('../../assets/img/nav/发布求职.svg')}
							arrow="horizontal"
							onClick={() => {
								this.props.history.push({pathname:'/postJob',query:{name:true}})
							}}
						>发布求职</Item>
						<Item
							key={3}
							thumb={require('../../assets/img/nav/我的工作.svg')}
							arrow="horizontal"
							onClick={() => {
								this.props.history.push('/allJob')
							}}
						>我的求职</Item>
						<Item
							key={4}
							thumb={require('../../assets/img/nav/个人资料.svg')}
							arrow="horizontal"
							onClick={() => {this.props.history.push({pathname:"/userInfo",query: { modified : true }})}}
						>我的资料</Item>
						<Item
							key={5}
							thumb={require('../../assets/img/nav/简历.svg')}
							arrow="horizontal"
							onClick={() => {this.props.history.push(`/resume/${this.state.userInfo}`)}}
						>我的简历</Item>
						<Item
							key={6}
							thumb={require('../../assets/img/nav/切换身份.svg')}
							arrow="horizontal"
							extra={'切换至我要找工作'}
							onClick ={()=>{
								Modal.alert('切换身份','确定切换到求职状态吗?',[
									{text:'取消',onPress:()=>console.log('取消')},
									{text:'确定',onPress:()=>this.changeStatus()},
								])
							}}
						>
							切换身份
						</Item>
						</QueueAnim>
					</List>
				</div>
				<List key={3}>
					<Button type='warning' onClick={this.logout}>退出登录</Button>
				</List>
				</QueueAnim>
			</div>

		)
	}
}

export default connect(
	state=>({
		userInfo:state.userInfo,
		unReadCount:state.chat.unReadCount
	})
)(withRouter(MyInfoEmployee))