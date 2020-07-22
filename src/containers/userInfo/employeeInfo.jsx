import React, { Component } from 'react'
import Nav from '../../components/nav/nav'
import Introduction from '../userInfoModal/introduction'
import Ability from '../userInfoModal/ability'
import defaultImg from '../../assets/img/avatar/default.jpeg'
import {getUserInfo} from '../../redux/action'
import {connect} from 'react-redux';
import { ActionSheet, Toast, List, InputItem, Picker, Badge,Modal} from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import {
	employeeAvatarData,
	birthData,
	genderData,
	identityData,
	educationData,
	enrollmentData,
	graduationData,
	getAge
} from '../../utils'
import cityData from '../../utils/cityInfo'
import {
	reqDeleteAvatar,
	reqUploadAvatar,
	reqUserInfo,
	reqUserInfoUpdate,
} from '../../api'
import Cookies from 'js-cookie'

const alert = Modal.alert;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
let wrapProps
if (isIPhone) {
	wrapProps = {
		onTouchStart: e => e.preventDefault(),
	}
}
let formData = new FormData()
const Item = List.Item
const Brief = Item.Brief

class EmployeeInfo extends Component {
	state = {
		navTitle: '创建简历(1/3)',
		rightButton: '下一步',
		isClick: true,
		step: 1,
		avatar: '',
		birth: '',
		gender: 1,
		email: '',
		address: '',
		identity: '',
		school: '',
		major: '',
		education: '',
		enrollment: '',
		graduation: '',
		step_text: '',
		step_text2: '',
		introduction: '',
		ability: '',
		modal: '',
		imgNameFile: [],
	}
	cancel = () => {
		if (this.state.step === 1) {
			if(this.props.modified){
				this.props.history.goBack();
			}else{
				Toast.fail('请完成初始信息填写');
			}
		} else if (this.state.step === 2) {
			this.setState({
				step: 1,
				navTitle: '创建简历(1/3)'
			})
		} else {
			this.setState({
				step: 2,
				navTitle: '创建简历(2/3)',
				rightButton: '下一步'
			})
		}
	}
	nextStep = () => {
		const { avatar, name, birth, phone , email, address, identity, school, major, education, enrollment, graduation } = this.state
		if (this.state.step === 1) {
			if (avatar && name && birth && phone && email && address && identity) {
				this.setState({
					step: 2,
					navTitle: '创建简历(2/3)'
				})
			} else {
				Toast.fail('检查是否填写完毕', 1)
			}
		} else if (this.state.step === 2) {
			if (school && major && education && enrollment && graduation) {
				this.setText1()
				this.setText2()
				this.setState({
					step: 3,
					navTitle: '创建简历(3/3)',
					rightButton: '保存'
				})
			} else {
				Toast.fail('检查是否填写完毕', 1)
			}
		} else {
			alert('保存', '确定保存吗', [
				{ text: '取消', onPress: () => console.log('cancel') },
				{ text: '确定', onPress: async () => {
						let userObj = {};
						userObj.name = this.state.name;
						userObj.birth = this.state.birth.join(',');
						userObj.gender = this.state.gender;
						userObj.phone = this.state.phone;
						userObj.email = this.state.email;
						userObj.address = this.state.address.join(',');
						userObj.identity = this.state.identity.join(',');
						userObj.school = this.state.school;
						userObj.major = this.state.major;
						userObj.education = this.state.education.join(',');
						userObj.enrollment = this.state.enrollment.join(',');
						userObj.graduation = this.state.graduation.join(',');
						userObj.introduction = this.state.introduction;
						userObj.ability = this.state.ability;
						userObj.modified = true;
						const resultFinal = await reqUserInfoUpdate(userObj);
						console.log(resultFinal);
						if(resultFinal.data.doc){
							this.props.getUserInfo(this.props.user.userInfo);
							Toast.success('信息填写成功',1)
							if(this.props.modified){
								this.props.history.goBack();
							}else{
								this.props.history.replace('/postJob');
							}
						}
					} },
			])
		}
	}
	setModal = (name) => {
		if (name) {
			this.setState({
				modal: name
			})
		} else {
			this.setState({
				modal: ''
			})
		}
	}
	imgChange = () => {
		var file = this.refs.imgFile.files[0]
		if (file) {
			var reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadstart = () => {
				console.log('文件上传中...')
			}
			reader.onload = async () => {
				let formData = new FormData()
				formData.append('avatar', file)
				await this.uploadAvatar(formData)
				this.setState({
					avatar: reader.result
				})
			}
		}
	}
	//上传图片到服务器
	uploadAvatar = async (formData) => {
		const response = await reqUploadAvatar(formData)
		const result = response.data
		if (result.code === 1) {
			Toast.fail(result.msg, 1)
			return
		}
		if (this.state.avatar.indexOf('/images/avatar/employer') === -1) {
			await this.deleteAvatar(result.data.name)
		}
		const finalResult = await this.updateUserInfo({ avatar: result.data.url })
		if (finalResult.code === 1) {
			Toast.fail('头像上传失败，请稍后重试', 1)
		} else {
			Toast.success('上传成功', 1)
		}
	}
	//上传头像的时候向服务器发送删除原图像的请求,avatarName对象{name:imgNameFile[0]}
	deleteAvatar = async (avatarName) => {
		const imgNameFile = this.state.imgNameFile
		if (imgNameFile.length !== 0) {
			imgNameFile.push(avatarName)
			await reqDeleteAvatar({ name: imgNameFile[0] })
			imgNameFile.splice(0, 1)
			this.setState({
				imgNameFile: imgNameFile
			})
		}
	}
	//更新用户信息,userInfo为数据对象
	updateUserInfo = async (userInfo) => {
		const response = await reqUserInfoUpdate(userInfo)
		const result = response.data
		return result
	}
	showActionSheet = () => {
		const BUTTONS = ['选择默认头像', '上传头像', '取消']
		ActionSheet.showActionSheetWithOptions({
				options: BUTTONS,
				cancelButtonIndex: BUTTONS.length - 1,
				destructiveButtonIndex: BUTTONS.length - 1,
				// title: 'title',
				message: '用户头像设置',
				maskClosable: true,
				'data-seed': 'logId',
				wrapProps,
			},
			(buttonIndex) => {
				if (buttonIndex === 0) {
					this.showShareActionSheetMulpitleLine()
				} else if (buttonIndex === 1) {
					this.refs.imgFile.click()
				}
			})
	}
	showShareActionSheetMulpitleLine = () => {
		const dataList = employeeAvatarData.map(obj => ({ icon: <img src={obj.url} alt='头像' style={{ width: 50 }}/> }))
		const data = [[dataList[0], dataList[1], dataList[2], dataList[3]], [dataList[4], dataList[5], dataList[6], dataList[7]]]
		ActionSheet.showShareActionSheetWithOptions({
				options: data,
				maskClosable: true
			}, async (buttonIndex, rowIndex) => {
				if (buttonIndex !== -1) {
					let index = 0
					if (rowIndex === 0) {
						index = buttonIndex
					} else {
						index = 4 + buttonIndex
					}
					if(this.state.avatar && this.state.avatar.indexOf('/images/avatar/employee') ===-1){
						await this.deleteAvatar(this.state.avatar);
					}
					await this.updateUserInfo({avatar:employeeAvatarData[index].url});
					this.setState({
						avatar:employeeAvatarData[index].url
					})
					Toast.success('设置成功', 1)
				}
			}
		)
	}
	setName = (val) => {
		this.setState({
			name: val
		})
	}
	setPhone = (val) => {
		this.setState({
			phone: val
		})
	}
	setEmail = (val) => {
		this.setState({
			email: val
		})
	}
	setSchool = (val) => {
		this.setState({
			school: val
		})
	}
	setMajor = (val) => {
		this.setState({
			major: val
		})
	}
	setText1 = () => {
		let str = ''
		str += this.state.school + '/'
		if (this.state.education.length == 2) {
			str += this.state.education[0] + '·' + this.state.education[1]
		} else {
			str += this.state.education[0]
		}
		this.setState({
			step_text: str
		})
	}
	setText2 = () => {
		let { birth, graduation } = this.state
		let str = ''
		let age = getAge(birth[0], birth[1], birth[2])
		let date = new Date
		let year = date.getFullYear()
		if (year == graduation[0]) {
			str += '应届毕业生/'
		} else if (year > graduation) {
			str += '已毕业/'
		} else {
			str += '未毕业/'
		}
		str += age + '岁'
		this.setState({
			step_text2: str
		})
	}
	setIntroduction = (val) => {
		this.setState({
			introduction: val
		})
	}
	setAbility = (val) => {
		this.setState({
			ability: val
		})
	}

	componentDidMount = async () => {
		//待修改
		const username = Cookies.get('username')
		if (!username) {
			this.props.history.replace('/login')
		}
		// const userId = Cookies.get('userId');
		// console.log(userId.slice(userId.indexOf('"')+1,userId.lastIndexOf('"')));
		const response = await reqUserInfo({ username: username })
		const userInfo = response.data.data.userInfo[0]
		if(userInfo.avatar){
			this.setState({
				avatar:userInfo.avatar,
				name:userInfo.name,
				gender:userInfo.gender,
			})
		}
		if(this.props.modified){
			this.setState({
				birth:userInfo.birth.split(','),
				phone:userInfo.phone,
				email:userInfo.email,
				address:userInfo.address.split(','),
				identity:[userInfo.identity],
				school:userInfo.school,
				major:userInfo.major,
				education:userInfo.education.split(','),
				enrollment:userInfo.enrollment.split(','),
				graduation:userInfo.graduation.split(','),
				introduction:userInfo.introduction,
				ability:userInfo.ability
			})
		}
		const str = this.state.avatar
		if (str) {
			let arr = []
			arr.push(str.substr(str.lastIndexOf('avatar')))
			this.setState({
				imgNameFile: arr
			})
		}
	}

	render () {
		const {
			navTitle, rightButton, step,
			avatar, name, birth, gender, phone,email, address, identity,
			school, major, education, enrollment, graduation,
			step_text, step_text2, introduction, ability,
			modal
		} = this.state
		return (
			<div id='employee_info'>
				{
					(() => {
						switch (modal) {
							case 'introduction':
								return <Introduction setModal={this.setModal} setIntroduction={(val) => this.setIntroduction(val)}
								                     value={introduction}/>
							case 'ability':
								return <Ability setModal={this.setModal} setAbility={this.setAbility} value={ability}/>
							default:
								return <div id='main_modal' style={{ height: '100%' }}>
									<Nav title={navTitle} click={this.cancel} right={<span
										style={{ color: avatar && birth && phone && email && address && identity ? '' : 'rgba(84,160,255,0.5)' }}
										onClick={this.nextStep}>{rightButton}</span>}/>
									<div style={{ display: step === 1 ? '' : 'none' }}>
										<div style={{ width: '100%', height: '3px', background: '#f5f4f9' }}></div>
										<div className='change_avatar'>
											<input
												type="file"
												name='avatar'
												accept="image/gif,image/jpeg,image/x-png"
												style={{ position: 'absolute', left: '-999px', width: '0px', opacity: '0' }}
												ref='imgFile'
												onChange={() => {this.imgChange()}}
											/>
											<img src={avatar ? avatar : defaultImg} alt="头像" onClick={this.showActionSheet}/>
											<span>修改头像</span>
										</div>
										<List>
											<InputItem placeholder='请输入' value={name} onChange={this.setName}>姓名</InputItem>
											<Picker
												data={birthData}
												title="生日"
												cascade={false}
												extra="请选择"
												format={(labels)=>{
													if(labels[0]){
														return labels[0]+'-'+labels[1]+'-'+labels[2]
													}
													return ''
												}}
												value={birth}
												onChange={v => this.setState({ birth: v })}
												onOk={v => this.setState({ birth: v })}
											>
												<List.Item arrow="horizontal">生日</List.Item>
											</Picker>
											<Picker
												data={genderData}
												title="性别"
												cascade={false}
												extra="请选择"
												value={[gender]}
												cols={1}
												onChange={v => this.setState({ gender: v[0] })}
												onOk={v => this.setState({ gender: v[0] })}
											>
												<List.Item arrow="horizontal">性别</List.Item>
											</Picker>
											<InputItem placeholder='请输入' value={phone} onChange={this.setPhone}>手机号</InputItem>
											<InputItem placeholder='请输入' value={email} onChange={this.setEmail}>联系邮箱</InputItem>
										</List>
										<div style={{ background: '#f5f4f9', height: '2px', margin: '5px 25px' }}></div>
										<List>
											<Picker
												data={cityData}
												title="所在城市"
												extra="请选择"
												format={(labels)=>{
													if(labels[0]){
														return labels[0]+'-'+labels[1]+'-'+labels[2]
													}
													return ''
												}}
												value={address}
												onChange={v => this.setState({ address: v })}
												onOk={v => this.setState({ address: v })}
											>
												<List.Item arrow="horizontal">所在城市</List.Item>
											</Picker>
											<Picker
												data={identityData}
												title="当前身份"
												cascade={false}
												extra="请选择"
												value={identity}
												cols={1}
												onChange={v => this.setState({ identity: v })}
												onOk={v => this.setState({ identity: v })}
											>
												<List.Item arrow="horizontal">当前身份</List.Item>
											</Picker>
										</List>
									</div>
									<div style={{ display: step === 2 ? '' : 'none' }}>
										<List>
											<Item>
												填写教育经历
											</Item>
											<InputItem placeholder='请输入' value={school} onChange={this.setSchool}>学校名称</InputItem>
											<InputItem placeholder='请输入' value={major} onChange={this.setMajor}>专业名称</InputItem>
											<Picker
												data={educationData}
												title="学历"
												extra="请选择"
												format={(labels)=>{
													if(labels[0]){
														return labels[0]+'-'+labels[1]
													}
													return ''
												}}
												value={education}
												cols={2}
												onChange={v => this.setState({ education: v })}
												onOk={v => this.setState({ education: v })}
											>
												<List.Item arrow="horizontal">学历</List.Item>
											</Picker>
										</List>
										<div style={{ background: '#f5f4f9', height: '2px', margin: '5px 25px' }}></div>
										<List>
											<Picker
												data={enrollmentData}
												title="入学时间"
												cascade={false}
												extra="请选择"
												format={(labels)=>{
													if(labels[0]){
														return labels[0]+'-'+labels[1]
													}
													return ''
												}}
												value={enrollment}
												onChange={v => this.setState({ enrollment: v })}
												onOk={v => this.setState({ enrollment: v })}
											>
												<List.Item arrow="horizontal">入学时间</List.Item>
											</Picker>
											<Picker
												data={graduationData}
												title="毕业时间"
												cascade={false}
												extra="请选择"
												format={(labels)=>{
													if(labels[0]){
														return labels[0]+'-'+labels[1]
													}
													return ''
												}}
												value={graduation}
												onChange={v => this.setState({ graduation: v })}
												onOk={v => this.setState({ graduation: v })}
											>
												<List.Item arrow="horizontal">毕业时间</List.Item>
											</Picker>
										</List>
									</div>
									<div style={{ display: step === 3 ? '' : 'none' }}>
										<div className='step3-head'>
            <span className='span-1'>
              {name}
            </span>
											<span className='span-2'>
                        {step_text}
            </span>
											<span className='span-3'>
                        {step_text2}
            </span>
											<img src={avatar ? avatar : defaultImg} alt="头像"/>
										</div>
										<List>
											<Item
												arrow="horizontal"
												multipleLine
												onClick={() => {this.setModal('introduction')}}
												platform="android"
											>
												个人介绍<Brief>{introduction}</Brief>
											</Item>
											<Item
												arrow="horizontal"
												multipleLine
												onClick={() => {this.setModal('ability')}}
												platform="android"
											>
												综合能力<Brief>{
												ability.split(',').map((item, index) => {
													return <Badge key={index} text={item} style={{ marginLeft: 12 }}/>
												})
											}</Brief>
											</Item>
										</List>
									</div>
								</div>
						}
					})()
				}
			</div>
		)
	}
}

export default connect(
	state=>({
		user:state.user,
	}),
	{getUserInfo}
)(withRouter(EmployeeInfo))
