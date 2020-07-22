import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import Nav from '../../components/nav/nav'
import './resume.css'
import { List, Tabs, Badge, WingBlank, Button } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import {getAge} from '../../utils'
import {reqGetUserInfoData} from '../../api'

const Item = List.Item;
const Brief = Item.Brief;
const tabs = [
	{ title:'在线简历' },
	{ title: '联系方式' },
];
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
class Resume extends Component {
	state={
		name:'',
		school:'',
		education:'',
		identity:'',
		age:'',
		gender:1,
		avatar:'',
		introduction:'',
		ability:[],
		major:'',
		graduation:'',
		enrollment:'',
		phone:'',
		email:''
	}
	async componentDidMount () {
		let response = await reqGetUserInfoData({id:this.props.match.params.id});
		let result = response.data.data;
		this.setState({
			name:result.name,
			school:result.school,
			education:result.education.split(',').length===0?result.education.split(',')[0]:result.education.split(',').join('·'),
			identity:identity(result.graduation.split(',')[0]),
			age:getAge(result.birth.split(',')[0],result.birth.split(',')[1],result.birth.split(',')[2]),
			gender:result.gender,
			avatar:result.avatar,
			introduction:result.introduction,
			ability:result.ability.split(','),
			major:result.major,
			graduation:result.graduation.split(',').join('.'),
			enrollment:result.enrollment.split(',').join('.'),
			email:result.email,
			phone:result.phone
		})
	}
	render () {
		const {name,school,education,identity,age,gender,avatar,introduction,ability,major,graduation,enrollment,email,phone} = this.state;
		return (
			<div id='resume'>
				<QueueAnim type={'left'} delay={300}>
				<Nav key={1} click={()=>this.props.history.goBack()} title={'在线简历'}/>
				<div key={2} className='resume-body'>
					<div className='resume-top'>
						<List>
							<Item extra={
								<div>
									<img className='img-avatar' src={avatar?avatar:require('../../assets/img/avatar/default.jpeg')} alt=""/>
									<img className='img-gender' src={gender===1?require('../../assets/img/nav/男.svg'):require('../../assets/img/nav/女.svg')} alt=""/>
								</div>
							}>
								<div>
									<p>{name}</p>
									<p>{school}/{education}</p>
									<p>{identity}/{age}岁</p>
								</div>
							</Item>
						</List>
					</div>
					<div className='resume-middle'>
						<Tabs tabs={tabs}
						      initialPage={0}
						      onChange={(tab, index) => { console.log('onChange', index, tab); }}
						      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
						      tabBarInactiveTextColor={'#888888'}
						      tabBarActiveTextColor={'#222222'}
						>
							<div className='resume-tab-1' style={{ height: '500px', backgroundColor: '#fff' }}>
								<List>
									<Item>
										<div className='resume-introduction'>
											<p>
												个人介绍
											</p>
											<div>
												{introduction}
											</div>
										</div>
									</Item>
									<Item>
										<div className='resume-ability'>
											<p>
												个人能力
											</p>
											<div>
												{
													ability.map((item,index)=>
														<Badge key={index} text={item} style={{ marginLeft: 12 }}/>
													)
												}
											</div>
										</div>
									</Item>
									<Item>
										<div className='resume-education'>
											<p>
												教育经历
											</p>
											<div>
												<p>{school}</p>
												<p>
													<span>{education}</span>
													<span>|</span>
													<span>{major}</span>
												</p>
												<p>
													<span>{enrollment}-{graduation}</span>
												</p>
												<img src={require('../../assets/img/school/cdut.png')} alt=""/>
											</div>
										</div>
									</Item>
								</List>
							</div>
							<div className='resume-tab-2' style={{ height: '500px', backgroundColor: '#fff' }}>
								<List>
									<Item align="top" thumb={require('../../assets/img/nav/手机.svg')}>
										手机号码<Brief>{phone}</Brief>
									</Item>
									<Item align="top" thumb={require('../../assets/img/nav/邮箱.svg')}>
										邮箱<Brief>{email}</Brief>
									</Item>
								</List>
							</div>
						</Tabs>
					</div>
				</div>
					{
						this.props.location.query?<div className={'resume-chat'}>
							<WingBlank>
								<Button type={'primary'} onClick={()=>this.props.history.push(`/chat/${this.props.match.params.id}`)}>
									聊一聊
								</Button>
							</WingBlank>
						</div>:''
					}
				</QueueAnim>

			</div>
		)
	}
}

export default withRouter(Resume)