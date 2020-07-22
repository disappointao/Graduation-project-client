import React, { Component } from 'react'
import {List} from 'antd-mobile'
import './spaceItem.css'
import WingBlank from 'antd-mobile/es/wing-blank'
import { reqGetUserInfoData } from '../../api'
import Cookies from 'js-cookie'
const Item = List.Item;
const Brief = Item.Brief;
class SpaceItem extends Component {
	state={
		userInfo:''
	}
	async componentDidMount () {
		let infoResponse = await reqGetUserInfoData({id:this.props.data.userInfo});
		let infoResult = infoResponse.data.data;
		this.setState({
			userInfo:infoResult
		})
	}

	render () {
		const data = this.props.data;
		const {userInfo} = this.state;
		return (
			<div id='spaceItem'>
				<List>
					<Item align="top" thumb={userInfo.avatar?userInfo.avatar:require('../../assets/img/avatar/default.jpeg')} multipleLine>
						{userInfo.name?userInfo.name:'某某'} <Brief>{userInfo.job?userInfo.job:'求职者'}</Brief>
					</Item>
				</List>
				<WingBlank>
					<p>
						{data.content}
					</p>
				</WingBlank>
				<WingBlank>
					<div className={'space-img'}>
						<img src={data.space} alt=""/>
					</div>
				</WingBlank>
				<div className={'space-bottom'}>
					<img src={require('../../assets/img/nav/点赞.svg')} alt=""/>
					<img src={require('../../assets/img/nav/评论.svg')} alt=""/>
				</div>
			</div>
		)
	}
}

export default SpaceItem