import React, { Component } from 'react'
import './space.css'
import {Icon,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import SpaceItem from '../../components/spaceItem/spaceItem'
import QueueAnim from 'rc-queue-anim'
import { reqGetSpace, reqGetUserInfoData } from '../../api'
import Index from '../../components/index'
import Cookies from 'js-cookie'
class Space extends Component {
	state={
		spaceList:[],
		userInfo:'',
		id:''
	}
	async componentDidMount () {
		let id = Cookies.get('userInfo');
		let userInfo = id.substring(id.indexOf('"')+1,id.lastIndexOf('"'));
		console.log(userInfo);
		let infoResponse = await reqGetUserInfoData({id:userInfo});
		let infoResult = infoResponse.data.data;
		let response = await reqGetSpace({userInfo:userInfo});
		let result = response.data.data;

		this.setState({
			spaceList:result,
			userInfo:infoResult,
		})
	}

	render () {
		const {userInfo,id} = this.state
		return (
			<div id='space'>
				<QueueAnim type={'left'} delay={200}>
				<div key={1} className='space-head'>
					<Icon type={'left'} size='lg' onClick={()=>{this.props.history.goBack()}}/>
					<div className={'space-head-body'}>
						<p>
							{userInfo.name?userInfo.name:'某某'}
						</p>
						<img src={userInfo.avatar?userInfo.avatar:require('../../assets/img/avatar/default.jpeg')} alt=""/>
					</div>
					<div className={'space-head-bottom'}>
						<div>
							<span>0</span>
							<p>点赞</p>
						</div>
						<div>
							<span>0</span>
							<p>评论</p>
						</div>
						<div>
							<span>0</span>
							<p>回复</p>
						</div>
					</div>
				</div>
				<div key={2} className={'space-body'}>
					<WingBlank>
						<p className={'space-body-title'}>
							动态条数
							<span>({this.state.spaceList.length})</span>
						</p>
					</WingBlank>
					<QueueAnim type={'scale'}>
						{
							this.state.spaceList.map((item,index)=>
								<WingBlank key={index}>
									<SpaceItem data={item}/>
								</WingBlank>
							)
						}
					</QueueAnim>
					{
						this.state.spaceList.length!==0?<WingBlank>
							<div style={{background:'#fff',width:'100%',height:'100px',marginTop:'10px',borderTopLeftRadius:'15px',borderTopRightRadius:'15px'}}>
							</div>
						</WingBlank>:<div></div>
					}
				</div>
				<div className='post-space' onClick={()=>{this.props.history.push(`/postSpace/${this.props.match.params.id}`)}}>
					<img src={require('../../assets/img/nav/发布动态.svg')} alt=""/>
					<span>发布动态</span>
				</div>
				</QueueAnim>
			</div>
		)
	}
}

export default withRouter(Space)