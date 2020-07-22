import React, { Component } from 'react'
import { InputItem, List, NavBar, Icon, Grid } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import { connect } from 'react-redux'
import { sendMsg,readMsg } from '../../redux/action'
import { withRouter } from 'react-router-dom'

const Item = List.Item
const Brief = Item.Brief

class Chat extends Component {
	state = {
		content: '',
		msg: []
	}


	// fixCarousel () {
	// 	setTimeout(function () {
	// 		window.dispatchEvent(new Event('resize'))
	// 	}, 0)
	// }

	toggleShow = () => {
		const isShow = !this.state.showEmoji
		this.setState({
			showEmoji: isShow
		})
		if (isShow) {
			setTimeout(() => { window.dispatchEvent(new Event('resize')) }, 0)

		}
	}
	submit = () => {
		const content = this.state.content.trim()
		const to = this.props.match.params.id
		const from = this.props.userInfo._id
		this.props.sendMsg({ from, to, content })
		this.setState({ content: '' })
	}

	componentDidMount () {
		this.props.readMsg(this.props.match.params.id,this.props.userInfo._id);
	}
	componentDidUpdate (prevProps, prevState, snapshot) {
	}

	render () {
		const { msgList, users } = this.props.chat
		const userInfo = this.props.userInfo
		const targetId = this.props.match.params.id
		const chatId = [targetId, userInfo._id].sort().join('_')
		const msgs = msgList.filter(msg => msg.chat_id === chatId)
		const emoji = '😁 😂 😃 😄 😅 😆 😇 😈 😉 😊 😋 😌 😍 😎 😏 😐 😒 😓 😔 😖 😘 😚 😜 😝 😞 😠 😡 😢 😣 😤 😥 😨 😩 😪 😫 😭 😰 😱 😲 😳 😵 😶 😷 😸 😹 😺 😻 😼 😽 😾 😿 🙀 🙅 🙆 🙇 🙈 🙉 🙊 🙋 🙌 🙍 🙎 🙏 🚀 🚃 🚄 🚅 🚇 🚉 🚌 🚏 🚑 🚒 🚓 🚕 🚗 🚙 🚚 🚢 🚤 🚥 🚧 🚨 🚩 🚪 🚫 🚬 🚭 🚲 🚶 🚹 🚺 🚻 🚼 🚽 🚾 🛀 '
		.split(' ')
		.filter(v => v)
		.map(v => ({ text: v }))
		return (
			<div id='chat'>
				<NavBar icon={<Icon type="left"/>}
				        onLeftClick={() => {
					        this.props.history.goBack()
				        }
				        }>{users[targetId].name}</NavBar>
				<div className={'chat-body'}>
					<List>
						<QueueAnim type={'right'} >
						{
							msgs.map((msg,index) => {
								if (msg.from === targetId) {
									return (
										<Item key={index} thumb={users[targetId].avatar} multipleLine>
											{users[targetId].name}<Brief>{msg.content}</Brief>
										</Item>
									)
								} else {
									return (
										<Item key={index} className='chat-me' extra={
											<div>
												<img src={userInfo.avatar} alt=""/>
												<div style={{ marginRight: '10px' }}>{msg.content}</div>
											</div>
										}> </Item>
									)
								}
							})
						}
						</QueueAnim>

					</List>
				</div>
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.content}
							onChange={v => {
								this.setState({
									content: v
								})
							}}
							extra={
								<div>
									 <span
										 style={{ padding: '5px', display: 'inline-block' }}
										 onClick={this.toggleShow}
									 >😃</span>
									<span onClick={this.submit}>发送</span>
								</div>
							}
						>信息</InputItem>
					</List>
					{this.state.showEmoji ? <Grid
						data={emoji}
						columnNum={9}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={el => {
							this.setState({
								content: this.state.content + el.text
							})
						}}
					/> : null}
				</div>
			</div>
		)
	}
}

export default connect(
	state => ({ chat: state.chat, userInfo: state.userInfo }),
	{ sendMsg ,readMsg}
)(withRouter(Chat))