import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './allJob.css'
import { NavBar, Icon, List, Badge } from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;
class AllJob extends Component {
	render () {
		return (
			<div id='allJob'>
				<NavBar
					mode={'light'}
					icon={<Icon type="left" size="lg" />}
					onLeftClick={()=>{this.props.history.goBack()}}
					style={{position:'fixed',zIndex:'10',top:'0',width:'100%'}}
				>
					我的求职
				</NavBar>
				<div className='allJob-body'>
					<div className='allJob-top'>
						<List>
							<Item multipleLine extra={<img src={require('../../assets/img/avatar/employee6.png')} alt=""/>}>
								刘先生 <Brief>{
								<div>
									<p>
										<Badge text={'编程能力'} style={{ marginLeft: 12 }}/>
										<Badge text={'编程能力'} style={{ marginLeft: 12 }}/>
										<Badge text={'编程能力'} style={{ marginLeft: 12 }}/>
									</p>
									<span>我的学校：{'成都理工大学'}</span>
								</div>
							}</Brief>
							</Item>
						</List>
					</div>
					<p className='allJob-middle'>发布的求职
						<span>(10)</span>
					</p>
					<div className='allJob-bottom'>
						<List>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
							<Item multipleLine extra={'7k-8k'}>
								Web开发工程师 <Brief>{'成都/实习/本科'}</Brief>
							</Item>
						</List>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(AllJob)