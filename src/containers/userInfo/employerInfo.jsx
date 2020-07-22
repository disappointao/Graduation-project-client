import React, {Component} from 'react';
import Nav from '../../components/nav/nav';
import { List , InputItem , ActionSheet , Toast , Picker} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {
  reqUploadAvatar,
  reqUserInfo,
  reqUserInfoUpdate,
  reqDeleteAvatar,
  reqGetCompany,
} from '../../api';
import {connect} from 'react-redux';
import InfoModal from './infoModal';
import './employerInfo.css';
import defaultImg from '../../assets/img/avatar/default.jpeg';
import { employerAvatarData, genderData} from '../../utils';
import Cookies from 'js-cookie';

const Item = List.Item;
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
class EmployerInfo extends Component {
  state={
    infoModal:false,
    modalName:'',
    confirmClick:()=>{},
    infoData:'',
    avatar: "",
    gender:1,
    name:'',
    job:'',
    email:'',
    company:'',
    isNext:false,
    modified:"",
    imgNameFile:[],
  };
  imgOnError = () =>{
    this.refs.img.src=defaultImg;
  };
  imgChange=()=>{
    var file = this.refs.imgFile.files[0];
    if(file){
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = () => {
        console.log('文件上传中...');
      };
      reader.onload = async () => {
        let formData = new FormData();
        formData.append('avatar',file);
        await this.uploadAvatar(formData);
        this.setState({
          avatar:reader.result
        });
      }
    }
  };
  //上传图片到服务器
  uploadAvatar = async (formData) => {
    const response = await reqUploadAvatar(formData);
    const result = response.data;
    if(result.code ===1 ){
      Toast.fail(result.msg, 1);
      return;
    }
    if(this.state.avatar.indexOf('/images/avatar/employer') === -1){
      await this.deleteAvatar(result.data.name);
    }
    const finalResult = await this.updateUserInfo({avatar:result.data.url});
    if(finalResult.code === 1){
      Toast.fail('头像上传失败，请稍后重试', 1);
    }else{
      Toast.success('上传成功',1);
    }
  };
  //上传头像的时候向服务器发送删除原图像的请求,avatarName对象{name:imgNameFile[0]}
  deleteAvatar = async (avatarName) => {
    const imgNameFile = this.state.imgNameFile;
    if(imgNameFile.length !==0){
      imgNameFile.push(avatarName);
      await reqDeleteAvatar({name:imgNameFile[0]});
      imgNameFile.splice(0,1);
      this.setState({
        imgNameFile:imgNameFile
      });
    }
  };
  //更新用户信息,userInfo为数据对象
  updateUserInfo = async (userInfo) => {
    const response = await reqUserInfoUpdate(userInfo);
    const result = response.data;
    return result;
  };
  showActionSheet = () => {
    const BUTTONS = ['选择默认头像', '上传头像', '取消'];
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
      if(buttonIndex === 0){
        this.showShareActionSheetMulpitleLine();
      }else if(buttonIndex ===1 ){
        this.refs.imgFile.click();
      }
      });
  };

  showShareActionSheetMulpitleLine = () =>{
    const dataList = employerAvatarData.map(obj =>({icon:<img src={obj.url} alt='头像' style={{ width: 50 }} />}));
    const data = [[dataList[0],dataList[1],dataList[2],dataList[3]],[dataList[4],dataList[5],dataList[6],dataList[7]]];
    ActionSheet.showShareActionSheetWithOptions({
      options:data,
      maskClosable:true
    },async (buttonIndex,rowIndex)=>{
      if(buttonIndex !==-1){
        let index = 0;
        console.log(rowIndex);
        if(rowIndex === 0){
          index=buttonIndex;
        }else{
          index=4+buttonIndex;
        }
        if(this.state.avatar && this.state.avatar.indexOf('/images/avatar/employer') ===-1){
          await this.deleteAvatar(this.state.avatar);
        }
        await this.updateUserInfo({avatar:employerAvatarData[index].url});
        this.setState({
          avatar:employerAvatarData[index].url
        })
	      Toast.success('设置成功', 1)
      }
      }
      )
  };
  showInfoModal = () => {
    this.setState({
      infoModal:!this.state.infoModal
    })
  };
  setModal = (modalName,companyData)=>{
    this.setState({
      modalName:modalName,
    });
    if(!this.state.infoModal){
      this.setState({
        infoModal: !this.state.infoModal,
      })
    }
    if(modalName ==='companyModal'){
      this.setState({
        infoData:{
          companyName:this.state.company,
          click:this.setCompany
        }
      })
    }else if(modalName ==='employerConfirmModal'){
      let obj = {
        name:this.state.name,
        avatar:this.state.avatar,
        email:this.state.email,
        gender:this.state.gender,
        job:this.state.job,
        company:this.state.company,
      };
      if(companyData){
        obj.companyData = companyData;
      }
      console.log(obj);
      this.setState({
        infoData:obj
      })
    }else if(modalName === 'setCompanyModal'){
      let obj = {
        name:this.state.name,
        avatar:this.state.avatar,
        gender:this.state.gender,
        email:this.state.email,
        job:this.state.job,
        company:this.state.company
      };
      if(companyData){
        obj.companyData = companyData;
      }
      this.setState({
        infoData:obj
      })
    }
  };
  setCompany = (value) =>{
    this.setState({
      company:value
    })
  };
  setName = (value)=>{
    this.setState({
      name:value
    })
  };
  setEmail = (value)=>{
    this.setState({
      email:value
    })
  };
  setJob = (value)=>{
    this.setState({
      job:value
    })
  };
  nextStep = async () =>{
    let emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    const {avatar,name,email,job,company} = this.state;
    if(avatar&&name&&email&&job&&company&&emailReg.test(email)){
      const response =  await reqGetCompany({name:this.state.company});
      const result = response.data;
      if(!result.data){
        this.setModal('setCompanyModal');
      }else{
        this.setModal('employerConfirmModal');
      }
    }else{
      Toast.fail('请检查邮箱格式',1);
    }
  };
  componentDidMount = async ()=> {
    //待修改



    const username = Cookies.get('username');
	  if (!username) {
		  this.props.history.replace('/login')
	  }
    const response = await reqUserInfo({username:username});
    const userInfo = response.data.data.userInfo[0];
    if(userInfo.company){
    	let companyResponse = await reqGetCompany({_id:userInfo.company});
    	const companyName = companyResponse.data.data.name;
    	this.setState({
		    company:companyName
	    })
    }
    this.setState({
      avatar: userInfo.avatar,
      gender:userInfo.gender,
      name:userInfo.name,
      email:userInfo.email,
      modified:userInfo.modified,
	    job:userInfo.job,
    });
    const str = this.state.avatar;
    if(str){
      let arr =[];
      arr.push(str.substr(str.lastIndexOf('avatar')));
      this.setState({
        imgNameFile:arr
      });
    }
  };
  render() {
    const {avatar,name,gender,email,job,infoModal,company} = this.state;
    return (
      <div id='employer_info' style={{height:'100%'}}>
        {infoModal?<InfoModal modified={this.props.modified} isShow={()=>{this.showInfoModal()}} modalName={this.state.modalName} data={this.state.infoData} setModal={(modalName,data)=>this.setModal(modalName,data)}/> :
          <div id='employer_info_one'>
          <Nav title='基本信息' click={()=>{
          	if(this.props.modified){
          		this.props.history.goBack();
	          }else{
          		Toast.fail('请完善信息',1)
	          }
          }} right={<span onClick={this.nextStep} style={{color:name&&job&&company&&avatar ?'':'rgba(84,160,255,0.5)'}}>下一步</span>} style={{marginBottom:'10px',boxShadow: '0 2px 5px 2px rgba(33,36,53,0.1)'}} />
          <div className='employerInfo-list'>
            <List>
              <input
                type="file"
                name='avatar'
                accept="image/gif,image/jpeg,image/x-png"
                style={{position:'absolute',left:'-999px',width:"0px",opacity:'0'}}
                ref='imgFile'
                onChange={()=>{this.imgChange()}}
              />
              <Item extra={
                <img  ref='img' src={avatar?avatar:defaultImg}  onError={this.imgOnError} alt="" style={{display:'block',float:'right',height:'80px',width:'80px',borderRadius:'50%'}}/>

              } arrow="horizontal" onClick={()=>{this.showActionSheet()}} platform="android" >头像</Item>
              <InputItem placeholder='请输入' value={name} onChange={this.setName}>姓名</InputItem>
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
              <InputItem placeholder='用于接收简历与通知消息，可更改' value={email} onChange={this.setEmail}>邮箱</InputItem>
            </List>
            <List style={{marginTop:'20px'}}>
              <InputItem placeholder='请输入' value={job} onChange={this.setJob}>职位</InputItem>
              <Item extra={company} arrow="horizontal"  onClick={()=>this.setModal('companyModal')} platform="android">公司全称</Item>
            </List>
          </div>

        </div>}
      </div>
    );
  }
}

export default connect(
  state => state.user
)(withRouter(EmployerInfo));
