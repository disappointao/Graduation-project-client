import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {NavBar,Icon,WingBlank,WhiteSpace,ImagePicker} from 'antd-mobile'
import { reqPostSpace, reqUploadSpace } from '../../api'
import './postSpace.css'
import {Modal,Toast} from 'antd-mobile'
const alert = Modal.alert;
class PostSpace extends Component {
	state = {
		files:[],
		multiple: false,
	}
	onChange = async (files, type, index) => {
		// console.log(files, type, index);
		// console.log(files);
		this.setState({
			files,
		});
	}
	post = ()=>{
		if(this.refs.content.value&&this.state.files){
			alert('发布','确定发布动态吗?',[
				{ text: '取消', onPress: () => console.log('cancel'), style: 'default' },
				{ text: '确定', onPress: async () => {
						let formData = new FormData()
						formData.append('space', this.state.files[0].file)
						let uploadRes = await reqUploadSpace(formData);
						let uploadUrl = uploadRes.data.data.url;
						let response = await reqPostSpace({
							userInfo:this.props.match.params.id,
							content:this.refs.content.value,
							space:uploadUrl
						})
						let result = response.data.data;
						if(result){
							Toast.success('发布成功',1)
							this.props.history.goBack();
						}
					} },
			])
		}
	}
	render () {
		const { files } = this.state;
		return (
			<div id='postSpace'>
				<NavBar
					mode="light"
					icon={<Icon type="left"  size={'lg'} onClick={()=>this.props.history.goBack()}/>}
					rightContent={
						<span onClick={()=>this.post()} style={{color:this.refs.content&&files?'black':'#888888'}}>
							发布
						</span>
					}
				>
					动态
				</NavBar>
				<WhiteSpace size={'lg'}/>
				<WingBlank>
					<textarea ref='content' maxLength={500} placeholder={'分享你的想法'}/>
				</WingBlank>
				<WhiteSpace size={'lg'}/>
				<WingBlank>
					<p>
						<img src={require('../../assets/img/nav/图片.svg')} alt=""/>
						<span>选择图片</span>
					</p>
				</WingBlank>
				<WingBlank>
					<ImagePicker
						length={1}
						files={files}
						onChange={this.onChange}
						onImageClick={(index, fs) => console.log(index, fs)}
						selectable={files.length < 1}
						multiple={this.state.multiple}
					/>
				</WingBlank>
			</div>
		)
	}
}

export default withRouter(PostSpace)