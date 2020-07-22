import React, { Component } from 'react'
import { List, WhiteSpace, Button,Modal,Toast} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux';
import './myInfo.css'
import QueueAnim from 'rc-queue-anim'
import { reqGetEmployerList, reqGetUserInfoData, reqGetCompany, reqGetSpace ,reqChangeStatus} from '../../api'

const Item =List.Item;
const alert = Modal.alert;
class MyInfoEmployer extends Component {
	state={
		name:'',
		companyName:'',
		job:'',
		avatar:'',
		allRequire:0,
		spaceNum: 0
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
		let modified = this.props.userInfo.school ? true:false;
		const response = await reqChangeStatus({username:this.state.username,status:0,modified:modified});
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
		if (!username) {
			this.props.history.replace('/login')
		}
		let infoResponse = await reqGetUserInfoData({id:userInfo});
		let infoResult = infoResponse.data.data;
		let requireResponse = await reqGetEmployerList({userInfo:userInfo});
		let requireResult = requireResponse.data.data
		let companyResponse = await reqGetCompany({_id:userInfo.company});
		let companyResult = companyResponse.data.data
		let spaceResponse = await reqGetSpace({userInfo:userInfo});
		let spaceResult = spaceResponse.data.data;
		console.log(spaceResult);
		this.setState({
			name:infoResult.name,
			avatar:infoResult.avatar,
			allRequire:requireResult.length,
			companyName:companyResult.name,
			job:infoResult.job,
			userInfo:userInfo,
			spaceNum:spaceResult.length,
			username
		})
	}
	render () {
		const {userInfo} = this.props
		const {companyName,allRequire,spaceNum} = this.state;
		return (
			<div id='myInfoEmployee'>
				<QueueAnim type={'left'} delay={200}>
				<div key={1} className='info-head'>
					<div className='head-img'>
						<img src={userInfo.avatar} alt=""/>
					</div>
					<div className='head-name'>
						<p>{userInfo.name}</p>
						<span>{companyName?companyName:'某机构'} · {userInfo.job}</span>
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
							<span>{allRequire}</span>
							<p>招聘</p>
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
							thumb={require('../../assets/img/nav/发布招聘.svg')}
							arrow="horizontal"
							onClick={() => {
								this.props.history.push({pathname:'/postRequire',query:{name:true}})
							}}
						>发布招聘</Item>
						<Item
							key={3}
							thumb={require('../../assets/img/nav/我的招聘.svg')}
							arrow="horizontal"
							onClick={() => {
								this.props.history.push('/allRequire')
							}}
						>我的招聘</Item>
						<Item
							key={4}
							thumb={require('../../assets/img/nav/我的公司.svg')}
							arrow="horizontal"
							onClick={() => {this.props.history.push({pathname:"/userInfo",query: { modified : true }})}}
						>信息与公司</Item>
						<Item
							key={5}
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
)(withRouter(MyInfoEmployer))