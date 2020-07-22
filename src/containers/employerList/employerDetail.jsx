import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Button,NavBar,Icon,WingBlank,List,WhiteSpace} from 'antd-mobile'
import {getAddress} from '../../utils'
import { reqGetEmployerList } from '../../api'
import QueueAnim from 'rc-queue-anim';
const Item = List.Item;
const Brief = Item.Brief;
class EmployerDetail extends Component {
	state = {
		jobName:'',
		salary:'',
		address:'',
		jobType:'',
		eduRequire:'',
		avatar:'',
		name:'',
		companyName:'',
		job:'',
		brief:'',
		jobRequire:'',
		logo:'',
		scale:'',
		stage:'',
		userInfo:'',
		companyId:'',
	}
	async componentWillMount () {

	}

	async componentDidMount () {
		let result = await reqGetEmployerList({id:this.props.match.params.id});
		let data = result.data.data[0];
		let user =data.userData[0];
		let company = data.companyInfo[0];
		let job = data.jobInfo[0];
		this.setState({
			jobName:job.name,
			salary:data.salary.split(',').length===0?data.salary.split(',')[0]:data.salary.split(',').join('-'),
			address:getAddress(company.address).split(',')[2],
			jobType:data.jobType,
			eduRequire:data.eduRequire,
			avatar:user.avatar,
			name:user.gender===0?user.name.substr(0,1)+'女士':user.name.substr(0,1)+'先生',
			companyName:company.name,
			job:user.job,
			brief:data.brief,
			jobRequire:data.require,
			logo:company.logo,
			scale:company.scale,
			stage:company.stage,
			userInfo:data.userInfo,
			companyId:company._id,
		})
	}
	render () {
		const {jobName,salary,address,jobType,eduRequire,avatar,name,companyName,job,brief,jobRequire,logo,scale,stage,userInfo,companyId} = this.state;

		return (
			<div id='employerDetail' >
				<QueueAnim type={'left'} delay={300}>
				<NavBar
					key={1}
					icon={<Icon type="left" />}
					mode="light"
					onLeftClick={()=>{this.props.history.goBack()}}
					style={{position:'fixed',top:0,width:'100%',zIndex:'10'}}
				>职位详情</NavBar>
				<div className='detail-body' key={2}>
					<div className='body-top'>
						<WingBlank>
							<List>
								<Item extra={salary} align="top" multipleLine >
									{jobName}<Brief>{
									<div>
										<img src={require('../../assets/img/nav/地点.svg')} alt="地点"/>
										<span>{address}</span>
										<img src={require('../../assets/img/nav/招聘身份.svg')} alt="身份"/>
										<span>{jobType}</span>
										<img src={require('../../assets/img/nav/学历水平.svg')} alt="学历"/>
										<span>{eduRequire}</span>
									</div>
								}</Brief>
								</Item>
								<Item
									arrow="horizontal"
									thumb={avatar?avatar:require('../../assets/img/avatar/default.jpeg')}
									multipleLine
									onClick={() => {this.props.history.push(`/allRequire/${userInfo}`)}}
								>
									{name} <Brief>{companyName+' · '+job}</Brief>
								</Item>
							</List>
						</WingBlank>
					</div>
					<div className='body-middle'>
						<WingBlank>
							<List>
								<Item
									multipleLine
									wrap
								>
									职位详情<Brief>{brief}</Brief>
								</Item>
								<Item
									multipleLine
									wrap
								>
									职位要求<Brief>{jobRequire}</Brief>
								</Item>
							</List>
						</WingBlank>
					</div>
					<div className='body-bottom'>
						<WingBlank>
							<List>
								<Item
									arrow="horizontal"
									thumb={logo}
									multipleLine
									onClick={() => {this.props.history.push(`/companyDetail/${companyId}`)}}
								>
									{companyName} <Brief>{scale+' · '+stage}</Brief>
								</Item>
							</List>
						</WingBlank>
					</div>
				</div>
				<div key={3} style={{position:'fixed',width:'100%',bottom:'0',background:'white'}}>
					<WhiteSpace/>
				<WingBlank>
					<Button type='primary' onClick={()=>this.props.history.push(`/chat/${userInfo}`)}>立即沟通</Button>
				</WingBlank>
					<WhiteSpace/>
				</div>
				</QueueAnim>
			</div>
		)
	}
}

export default withRouter(EmployerDetail)