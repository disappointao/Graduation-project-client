import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { reqGetJobs,  reqPostRequire } from '../../api'
import QueueAnim from 'rc-queue-anim'
import './postRequire.less'
import { Button, List, NavBar, Picker, Toast, WhiteSpace, WingBlank,Modal } from 'antd-mobile'
import Cookies from 'js-cookie'
import { salaryData } from '../../utils'
const alert = Modal.alert;
class PostRequire extends Component {
	state = {
		job:'',
		jobs:[[]],
		salary:'',
		jobType:'',
		eduRequire:''
	}
	cancel = ()=>{
		if(this.props.location.query&&this.props.location.query.name){
			this.props.history.goBack('/home/myInfoEmployer');
		}else{
			this.props.history.replace('/home');
		}
	};
	ok = ()=>{
		alert('发布', '', [
			{ text: '取消', onPress: () => this.props.history.replace('/home') },
			{ text: '确定', onPress: async () => {
					if(this.state.job&&this.state.salary&&this.state.jobType&&this.state.eduRequire&&this.refs.textarea1.value,this.refs.textarea2.value){
						let obj = {};
						obj.job = this.state.job.join(',');
						obj.salary = this.state.salary.join(',');
						obj.brief = this.refs.textarea1.value;
						obj.require = this.refs.textarea2.value;
						obj.jobType = this.state.jobType[0];
						obj.eduRequire = this.state.eduRequire[0];
						console.log(obj);
						const result = await reqPostRequire(obj);
						if(result.data.code === 0){
							Toast.success('发布成功',1);
							this.props.history.replace('/home');
						}else{
							Toast.fail('发布失败请稍后重试',1);
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
		const {job,jobs,salary,jobType,eduRequire} = this.state;
		return (
			<div id='postRequire'>
				<QueueAnim delay={100}>
				<NavBar key={1}>
					发布招聘
				</NavBar>
				<div key={2} className='post-body'>
					<List>
						<Picker
							data={jobs}
							title="招聘岗位"
							cascade={false}
							extra="请选择"
							value={job}
							cols={1}
							onChange={v => this.setState({ job: v })}
							onOk={v => this.setState({ job: v })}
						>
							<List.Item arrow="horizontal">招聘岗位</List.Item>
						</Picker>
						<Picker
							data={[
								[
									{label:'实习',value:'实习'},
									{label:'应届',value:'应届'},
									{label:'社招',value:'社招'},
								]
							]}
							title="工作类型"
							cascade={false}
							extra="请选择"
							value={jobType}
							cols={1}
							onChange={v => this.setState({ jobType: v })}
							onOk={v => this.setState({ jobType: v })}
						>
							<List.Item arrow="horizontal">工作类型</List.Item>
						</Picker>
						<Picker
							data={[
								[
									{label:'学历不限',value:'学历不限'},
									{label:'专科',value:'专科'},
									{label:'本科',value:'本科'},
									{label:'硕士',value:'硕士'},
								]
							]}
							title="学历要求"
							cascade={false}
							extra="请选择"
							value={eduRequire}
							cols={1}
							onChange={v => this.setState({ eduRequire: v })}
							onOk={v => this.setState({ eduRequire: v })}
						>
							<List.Item arrow="horizontal">工作类型</List.Item>
						</Picker>
						<Picker
							data={salaryData}
							title="岗位月薪"
							extra="请选择"
							value={salary}
							format={(labels)=>{
								if(labels[1]){
									return labels[0]+'-'+labels[1]
								}
								return labels[0]
							}}
							cols={2}
							onChange={v => this.setState({salary : v })}
							onOk={v => this.setState({ salary: v })}
						>
							<List.Item arrow="horizontal">岗位月薪</List.Item>
						</Picker>
						<div className='require-job'>
							<p>岗位介绍</p>
							<textarea placeholder='主要介绍该岗位平时的工作内容'
							          maxLength={150}
							          ref='textarea1'
							/>
							<div style={{background:'#f5f4f9',height:'2px',margin:'10px 0'}}></div>
							<span>最多150汉字</span>
						</div>
						<div className='require-job' style={{paddingBottom:'30px'}}>
							<p>岗位要求</p>
							<textarea placeholder='介绍该岗工作所具备的条件'
							          maxLength={150}
							          ref='textarea2'
							/>
							<div style={{background:'#f5f4f9',height:'2px',margin:'10px 0'}}></div>
							<span>最多150汉字</span>
						</div>
					</List>
				</div>
				<div key={3} style={{position:'absolute',bottom:'0px',width:'100%',background:'white'}}>
					<WhiteSpace />
					<WingBlank size='lg'>
						<Button type='warning' onClick={this.cancel}>取消</Button>
					</WingBlank>
					<WhiteSpace/>
					<WingBlank size='lg'>
						<Button type='primary' onClick={this.ok}>确定发布</Button>
					</WingBlank>
					<WhiteSpace />
				</div>
				</QueueAnim>
			</div>
		)
	}
}

export default withRouter(PostRequire)