import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { NavBar, List, Badge ,SwipeAction,WhiteSpace} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import './message.css'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
const Brief = Item.Brief
function getLastMsg (msgList,userId) {
	const lastMsgObject = {};
	msgList.forEach(msg=>{
		msg.unReadCount = 0;
		const chatId = msg.chat_id;
		const lastMsg = lastMsgObject[chatId];
		if(!lastMsg){
			lastMsgObject[chatId]=msg;
			if(!msg.read && userId ===msg.to){
				msg.unReadCount = 1;
			}
		}else{
			if(msg.create_time>lastMsg.create_time){
				lastMsgObject[chatId] = msg;
				msg.unReadCount = lastMsg.unReadCount;
			}
			if(!msg.read && userId=== msg.to){
				msg.unReadCount++
			}
		}
	})
	const lastMsgs = Object.values(lastMsgObject);
	lastMsgs.sort(function (msg1,msg2) {
		return msg2.create_time-msg1.create_time
	})
	return lastMsgs
}
class Message extends Component {
	async componentDidMount () {
		const username = Cookies.get('username')
		if (!username) {
			this.props.history.replace('/login')
		}
	}

	render () {
		const {userInfo,chat} = this.props;
		const myId = userInfo._id;
		const {users,msgList}= chat;
		const lastMsgs = getLastMsg(msgList,myId)
		return (
			<div id='message'>
				<NavBar mode={'light'}>聊天</NavBar>
				<WhiteSpace/>
				<List>
					<QueueAnim type={'right'} delay={100}>
					{
						lastMsgs.map((msg,index)=>{
							const targetId = msg.from === myId ? msg.to : msg.from
							const targetUser = users[targetId]
							return(
								<SwipeAction
									key={index}
									style={{ backgroundColor: 'gray' }}
									autoClose
									right={[
										{
											text: '取消',
											onPress: () => console.log('cancel'),
											style: { backgroundColor: '#ddd', color: 'white' },
										},
										{
											text: '删除',
											onPress: () => console.log('delete'),
											style: { backgroundColor: '#F4333C', color: 'white' },
										},
									]}
									onOpen={() => console.log('global open')}
									onClose={() => console.log('global close')}
								>
									<Item extra={<Badge text={msg.unReadCount}/>} thumb={targetUser.avatar}
									      arrow='horizontal' platform="android" onClick={()=> this.props.history.push(`/chat/${targetId}`)}>
										{targetUser.name}
										<Brief>{msg.content}</Brief>
									</Item>
								</SwipeAction>
							)
						})
					}
					</QueueAnim>
				</List>
			</div>
		)
	}
}

export default connect(
	state =>({
		userInfo:state.userInfo,
		chat:state.chat
	})
)(withRouter(Message))