import React, { Component } from 'react'
import { NavBar, List, Picker, WingBlank, Button, WhiteSpace,Modal,Toast } from 'antd-mobile'
import {reqGetJobs,reqPostJob} from '../../api'
import { salaryData } from '../../utils'
import './postJob.css';
import defaultImg from '../../assets/img/avatar/employee1.png'
import QueueAnim from 'rc-queue-anim';
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
const  alert = Modal.alert;
class PostJob extends Component {
	state = {
		job:'',
		salary:'',
		jobs:[[]]
	};
	cancel = ()=>{
		if(this.props.location.query&&this.props.location.query.name){
			this.props.history.goBack('/home/myInfoEmployee');
		}else{
			this.props.history.replace('/home');
		}
	};
	ok = ()=>{
		alert('发布', '', [
			{ text: '取消', onPress: () => this.props.history.replace('/home') },
			{ text: '确定', onPress: async () => {
				if(this.state.job&&this.state.salary&&this.refs.textarea.value){
					let obj = {};
					obj.job = this.state.job.join(',');
					obj.salary = this.state.salary.join(',');
					obj.brief = this.refs.textarea.value;
					const result = await reqPostJob(obj);
					if(result.data.code === 0){
						Toast.success('发布成功',1);
						this.props.history.push('/home');
					}
				}else{
					Toast.fail('信息为填写完整',1);
				}
				} },
		])
	}
	async componentDidMount () {
		const username = Cookies.get('username')
		if (!username) {
			this.props.history.replace('/login')
		}
		let result = await reqGetJobs();
		let reqData = result.data.data
		let arr = [[]];
		reqData.map((value,index)=>{
			arr[0].push({
				label:value.name,
				value:value._id
			});
		})
		this.setState({
			jobs:arr
		})
	}

	render () {
		const {job,jobs,salary} = this.state
		return (
			<div id='postJob'>
				<QueueAnim delay={100}>
				<NavBar key={1}>
					发布求职
				</NavBar>
				<List key={2}>
					<Picker
						data={jobs}
						title="期望职位"
						cascade={false}
						extra="请选择"
						value={job}
						cols={1}
						onChange={v => this.setState({ job: v })}
						onOk={v => this.setState({ job: v })}
					>
						<List.Item arrow="horizontal">期望职位</List.Item>
					</Picker>
					<Picker
						data={salaryData}
						title="期望月薪"
						extra="请选择"
						format={(labels)=>{
							if(labels[1]){
								return labels[0]+'-'+labels[1]
							}
							return labels[0]
						}}
						value={salary}
						cols={2}
						onChange={v => this.setState({salary : v })}
						onOk={v => this.setState({ salary: v })}
					>
						<List.Item arrow="horizontal">期望月薪</List.Item>
					</Picker>
					<div className='introduction-job'>
						<p>知识技能</p>
						<textarea placeholder='主要介绍你在本工作上拥有的技能与长处等'
						          maxLength={150}
						          ref='textarea'
						/>
						<div style={{background:'#f5f4f9',height:'2px',margin:'10px 0'}}></div>
						<span>最多150汉字</span>
					</div>
					<div className='job-template'>
						<div className='template-head'>
							<img src={defaultImg} alt="头像"/>
							<span className='template-head-left'>web前端</span>
							<span className='template-head-right'>示例</span>
						</div>
						<div className='template-content'>
							拥有良好的前端编程能力，熟练Html5、css3新特性。熟练使用js语言，熟悉es6语法，熟悉前端主流框架vue和react。有一定的项目经验
						</div>
					</div>
				</List>
				<div key={3} style={{position:'absolute',bottom:'10px',width:'100%'}}>
					<WingBlank size='lg'>
						<Button type='warning' onClick={this.cancel}>取消</Button>
					</WingBlank>
					<WhiteSpace/>
					<WingBlank size='lg'>
						<Button type='primary' onClick={this.ok}>确定发布</Button>
					</WingBlank>
				</div>
				</QueueAnim>
			</div>
		)
	}
}

export default withRouter(PostJob);