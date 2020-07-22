import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './companyDetail.css'
import { NavBar ,Icon,List} from 'antd-mobile'
import {getAddress} from '../../utils'
import { reqGetCompany, reqGetEmployerList } from '../../api'
import QueueAnim from 'rc-queue-anim';
import EmployerItem from '../../components/employerItem/employerItem'

const Item = List.Item;
const Brief = Item.Brief;
class companyDetail extends Component {
	state={
		companyName:'',
		shortName:'',
		logo:'',
		address:'',
		scale:'',
		stage:'',
		Brief:'',
		companyId:'',
		listData:[],
	}
	async componentWillMount () {
		let result = await reqGetCompany({_id:this.props.match.params.id});
		let data = result.data.data;
		let listResult = await reqGetEmployerList({company:this.props.match.params.id});
		let listData = listResult.data.data;
		this.setState({
			companyName:data.name,
			logo:data.logo,
			shortName:data.shortName,
			address:getAddress(data.address).split(',').join('·'),
			scale:data.scale,
			stage:data.stage,
			brief:data.brief,
			companyId:data._id,
			listData:listData
		})
	}

	async componentDidMount () {
	}

	render () {
		const {companyName,shortName,address,scale,stage,brief,listData,logo} = this.state;
		return (
			<div id='companyDetail'>
				<QueueAnim type={'left'} delay={350}>
				<NavBar
					key={1}
					mode={'light'}
					icon={<Icon type="left" size="lg" />}
					onLeftClick={()=>this.props.history.goBack()}
					style={{position:'fixed',zIndex:'10',top:'0',width:'100%'}}
				>
					职位招聘者
				</NavBar>
				 <div key={2} className='companyDetail-body'>
					<div className='companyDetail-top'>
						<List>
							<Item multipleLine extra={<img src={logo?logo:require('../../assets/img/avatar/employee6.png')} alt=""/>}>
								{companyName+" ("+shortName+") "} <Brief>{
								<div>
									<p>
										<img src={require('../../assets/img/nav/地点.svg')} alt=""/>{address}
									</p>
									<p className='company-info'>
										<span>{stage}</span>
										<span>{scale}</span>
									</p>
								</div>
							}</Brief>
							</Item>
						</List>
					</div>
					<div className='companyDetail-middle'>
						<p>公司特色</p>
						<div>{brief}</div>
						<p>正在招聘
							<span>{listData.length}</span>
						</p>
					</div>
					<div className='companyDetail-bottom'>
						<List>
							{listData.map((item,index) => (
								<div key={index} onClick={()=>this.props.history.push(`/employerDetail/${item._id}`)}>
									<Item extra={item.salary.split(',').length===0?item.salary.split(',')[0]:item.salary.split(',').join('-')} align="top" thumb={item.userInfo[0].avatar} multipleLine>
										{item.jobInfo[0].name} <Brief>{item.userData[0].name}·{item.userData[0].job}</Brief>
									</Item>
								</div>
							))}
						</List>
					</div>
				</div>
				</QueueAnim>
			</div>
		)
	}
}

export default withRouter(companyDetail)