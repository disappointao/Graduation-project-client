import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './allRequire.css'
import { NavBar ,Icon,List} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import {reqGetUserInfoData,reqGetEmployerList,reqGetCompany} from '../../api'
import {getAddress} from '../../utils'

const Item = List.Item;
const Brief = Item.Brief;
class AllRequire extends Component {
	state= {
		name:'',
		avatar:'',
		job:'',
		companyName:'',
		listData:[]
	}
	async componentDidMount () {
		let userInfoRes = await reqGetUserInfoData({id:this.props.match.params.id});
		let userResult = userInfoRes.data.data;
		let companyRes = await reqGetCompany({_id:userResult.company});
		let companyResult = companyRes.data.data;
		let listRes = await reqGetEmployerList({userInfo:this.props.match.params.id})
		let listResult = listRes.data.data;
		this.setState(
			{
				name:userResult.gender===0?userResult.name.substr(0,1)+'女士':userResult.name.substr(0,1)+'先生',
				avatar:userResult.avatar,
				job:userResult.job,
				companyName:companyResult.name,
				listData:listResult
			}
		)
	}
	render () {
		const {name,avatar,job,companyName,listData} = this.state;
		return (
			<div id='allRequire'>
				<QueueAnim delay={300} type={'left'}>
				<NavBar
					key={1}
					mode={'light'}
					icon={<Icon type="left" size="lg" />}
					onLeftClick={()=>{this.props.history.goBack()}}
					style={{position:'fixed',zIndex:'10',top:'0',width:'100%'}}
				>
					职位招聘者
				</NavBar>
				<div key={2} className='allRequire-body'>
					<div className='allRequire-top'>
						<List>
							<Item multipleLine extra={<img src={avatar?avatar:require('../../assets/img/avatar/default.jpeg')} alt=""/>}>
								{name} <Brief>{
									<div>
										<p>
											{job}
										</p>
										<span>所属公司：{companyName}</span>
									</div>
							}</Brief>
							</Item>
						</List>
					</div>
					<p className='allRequire-middle'>发布的职位
						<span>{`(${listData.length})`}</span>
					</p>
					<div className='allRequire-bottom'>
						<List>
							{listData.map((item,index) => (
								<Item onClick={
									()=>{
										this.props.history.push(`/employerDetail/${item._id}`)
									}
								} key={index} multipleLine extra={item.salary.split(',').join('-')}>
									{item.jobInfo[0].name} <Brief>{getAddress(item.companyInfo[0].address).split(',')[0]+'/'+item.jobType+'/'+item.eduRequire}</Brief>
								</Item>
							))}
						</List>
					</div>
				</div>
				</QueueAnim>
			</div>
		)
	}
}

export default withRouter(AllRequire)