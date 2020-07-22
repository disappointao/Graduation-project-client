import {combineReducers} from "redux";
import {AUTH_SUCCESS,ERROR_MSG,GET_INFO,READ_MSG,RECEIVE_MSG_LIST,RECEIVE_MSG} from './action-types';

const initUser = {
    username:'',
    _id:'',
    status:1,
    modified:false,
    msg:''
};
const initUserInfo = {
}
const initChat = {
	msgList:[],
	users:{},
	unReadCount: 0
}
function user(state = initUser,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data,msg:''};
        case ERROR_MSG:
            return {...state,msg:action.data};
        default:
            return {...state};
    }
}
function userInfo (state=initUserInfo,action) {
	switch (action.type) {
		case GET_INFO:
			return{
				...action.data
			}
		default:
			return {...state}
	}

}
function chat (state=initChat, action) {
	switch (action.type) {
		case RECEIVE_MSG:
			var {msg,userId} = action.data;
			let newUsers = state.users;
			let newList = [...state.msgList,msg];
			console.log(newUsers,newList);
			return {
				msgList:newList,
				users:newUsers,
				unReadCount: state.unReadCount+(!msg.read&&msg.to===userId?1:0)
			}
		case RECEIVE_MSG_LIST:
			var {msgList,users,userId} = action.data;
			return{
				msgList,
				users,
				unReadCount: msgList.reduce((pre,msg)=>{
					return pre+(!msg.read&&msg.to===userId?1:0)
				},0)
			}
		case READ_MSG:
			const {count, from, to} = action.data;
			return {
				msgList: state.msgList.map(msg=>{
					if(msg.from===from && msg.to===to && !msg.read){
						return {...msg,read:true}
					}else{
						return msg
					}
				}),
				users:state.users,
				unReadCount: (state.unReadCount-count)<0?0:state.unReadCount-count
			}
		default:
			return {...state}
	}
}
export default combineReducers({
	user,
	userInfo,
	chat
})
