import { AUTH_SUCCESS, ERROR_MSG,GET_INFO , RECEIVE_MSG, RECEIVE_MSG_LIST, READ_MSG } from './action-types'
import { reqLogin, reqRegister, reqGetUserInfoData,reqMsgList, reqReadMsg } from '../api'
import io from 'socket.io-client'

const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const getInfo = (userInfo) =>({type:GET_INFO,data:userInfo})
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
const receiveMsgList = ({ users, msgList, userId }) => ({ type: RECEIVE_MSG_LIST, data: { users, msgList, userId } })
const receiveMsg = (msg, isToMe) => ({ type: RECEIVE_MSG, data: { msg, isToMe } })
const msgRead = ({ from, to, count }) => ({ type: READ_MSG, data: { from, to, count } })

export const login = ({ username, password }) => {
	return async dispatch => {
		const response = await reqLogin({ username, password })
		const result = response.data
		if (result.code === 1) {
			dispatch(errorMsg(result.msg))
		} else {
			getMsgList(dispatch,`${result.data.userInfo}`)
			dispatch(authSuccess(result.data))
		}
	}
}

export const register = ({ username, password, status }) => {
	return async dispatch => {
		const response = await reqRegister({ username, password, status })
		const result = response.data
		if (result.code === 1) {
			dispatch(errorMsg(result.msg))
		} else {
			dispatch(authSuccess(result.data))
		}
	}
}

export const getUserInfo = (id)=>{
	return async dispatch =>{
		const response = await reqGetUserInfoData(id)
		const result = response.data
		dispatch(getInfo(result.data));
	}
}
function initIO (dispatch, userId) {
	if (!io.socket) {
		io.socket = io('ws://localhost:4000')
		io.socket.on('receiveMessage', (chatMsg) => { console.log(chatMsg) ;if (chatMsg.from === userId || chatMsg.to === userId) { dispatch(receiveMsg(chatMsg, chatMsg.to === userId)) } })
	}
}

async function getMsgList (dispatch, userId) {
	console.log('我是userId',userId)
	initIO(dispatch, userId)
	const response = await reqMsgList({id:userId})
	const result = response.data
	if (result.code === 0) {
		const { msgList, users } = result.data
		dispatch(receiveMsgList({ msgList, users, userId }))
	}
}

export const sendMsg = ({ from, to, content }) => {
	return async dispatch => {
		io.socket.emit('sendMessage', {
			from,
			to,
			content
		})
	}
}
export const readMsg = (from,to) => {
	return async dispatch => {
		const response = await reqReadMsg({from,to})
		const result = response.data
		if(result.code===0) {
			const count = result.data
			dispatch(msgRead({count, from, to}))
		}
	}
}
