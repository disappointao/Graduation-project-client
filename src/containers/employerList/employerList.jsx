import React, { Component } from 'react'
import EmployerItem from '../../components/employerItem/employerItem'
import Cookies from 'js-cookie'
import './employerList.css'
import QueueAnim from 'rc-queue-anim';
import { SearchBar, Tabs,PullToRefresh ,WhiteSpace} from 'antd-mobile'
import {reqGetEmployerList } from '../../api'
let tabIndex = 0 ;
class EmployerList extends Component {
	state = {
		tabs:[
			{title: "全部"},
			{title: "web前端工程师", value: "5eaec5733e31df5a18d09efd"},
			{title: "后端工程师", value: "5eaec58df4843433c03560b4"},
			{title: "产品工程师", value: "5eaec5cae1170000cd005883"},
			{title: "测试工程师", value: "5eaec5d4e1170000cd005884"},
			{title: "算法工程师", value: "5eaec5e0e1170000cd005885"},
			{title: "项目经理", value: "5eaec5ede1170000cd005886"},
			{title: "产品运营", value: "5eaec5f6e1170000cd005887"}
		],
		data:[],
		list:[],
		pageIndex:0,
		refreshing: false,
		down:true,
	}
	listFilter = (jobId) =>{
		let arr = [];
		this.state.data.forEach(value=>{
			if(value.job===jobId){
				arr.push(value)
			}
		})
		if(tabIndex===0){
			this.setState({
				list:this.state.data,
				pageIndex:tabIndex
			})
		}else{
			this.setState({
				list:arr,
				pageIndex:tabIndex
			})
		}
	}
	async componentDidMount() {
		const username = Cookies.get('username')
		if (!username) {
			this.props.history.replace('/login')
		}
		// let jobResult = await reqGetJobs();
		// let jobData = jobResult.data.data;
		// let arr = [{title:'全部'}];
		// jobData.map((value,index)=>{
		// 	arr.push({
		// 		title:value.name,
		// 		value:value._id,
		// 	});
		// })
		// this.setState({
		// 	tabs:arr,
		// })
		let listResult = await reqGetEmployerList();
		let listData = listResult.data.data;
		this.setState({
			data: listData,
			list:listData
		})
	}
	render () {
		const {tabs,list,pageIndex}= this.state;
		console.log(this.state.data);
		return (
			<div id='employerList'>
				<SearchBar placeholder="搜索相关岗位" maxLength={8} />
				<div className='list-tabs'>
					<Tabs
						tabBarBackgroundColor='white'
						tabBarActiveTextColor='#37C2BB'
						tabBarInactiveTextColor='#777777'
						tabBarUnderlineStyle={{border:'1px solid #37C2BB'}}
						page={pageIndex}
						tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
						onTabClick = {(tab,index)=>{
							tabIndex = index
							this.listFilter(tab.value);
						}}
					>
					</Tabs>
				</div>
				<PullToRefresh
					style={{
						position:'absolute',
						width:'100%',
						top:'90px',
						bottom:"50px",
						overflow: 'auto',
					}}
					indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
					direction={this.state.down ? 'down' : 'up'}
					refreshing={this.state.refreshing}
					onRefresh={() => {
						this.setState({ refreshing: true });
						setTimeout(async () => {
							let listResult = await reqGetEmployerList();
							let listData = listResult.data.data;
							this.setState({ refreshing: false ,data:listData,list:listData});
						}, 1000);
					}}
				>
					<QueueAnim type={'scale'}>
						{list.map((item,index) => (
							<div key={index}>
								<EmployerItem data={item}/>
							</div>
						))}
						<WhiteSpace/>
					</QueueAnim>
				</PullToRefresh>
			</div>
		)
	}
}

export default EmployerList