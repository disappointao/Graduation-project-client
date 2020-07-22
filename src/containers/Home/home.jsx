import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';
import Axios from 'axios'
import NavBottom from '../../components/navBottom/navBottom'
import {connect} from 'react-redux'
import {navListData} from '../../utils'
import Cookies from 'js-cookie'
import './home.css'
import Company from '../company/company'
import EmployeeList from '../employeeList/employeeList'
import EmployerList from '../employerList/employerList'
import Message from '../message/message'
import Chat from '../message/chat'
import MyInfoEmployee from '../myInfo/myInfoEmployee'
import MyInfoEmployer from '../myInfo/myInfoEmployer'
import EmployeeDetail from '../employeeList/employeeDetail'
import EmployerDetail from '../employerList/employerDetail'
//引入导航图片
class Home extends Component {

	async componentDidMount () {
	}

	render () {
		const username = Cookies.get('username')
		const userStatus =Cookies.get('userStatus')
		const unReadCount = this.props.unReadCount
		if (!username) {
			this.props.history.replace('/login')
		}
		if(Number(userStatus)===0){
			navListData[0].hide=true;
			navListData[1].hide=false;
			navListData[5].hide=true;
			navListData[4].hide=false;
		}else{
			navListData[0].hide=false;
			navListData[1].hide=true;
			navListData[4].hide=true
			navListData[5].hide=false;
		}
		return (
			<div id='home'>
					<Switch>
						<Route path="/home/company" component={Company}/>
						<Route path="/home/employerList" component={EmployerList}/>
						<Route path="/home/employeeList" component={EmployeeList}/>
						<Route path="/home/message" component={Message}/>
						<Route path="/home/myInfoEmployee" component={MyInfoEmployee}/>
						<Route path="/home/myInfoEmployer" component={MyInfoEmployer}/>
						<Redirect from='/home' to={this.props.user.status===0?'/home/employerList':'/home/employeeList'}/>
					</Switch>
				<NavBottom unReadCount={unReadCount} navList={navListData}/>
			</div>
		)
	}
}

export default connect( state => ({user: state.user,unReadCount: state.chat.unReadCount }) )(Home)
