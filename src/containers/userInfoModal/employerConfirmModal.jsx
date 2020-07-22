import React, {Component} from 'react';
import Nav from '../../components/nav/nav';
import {initNav,getAddress} from '../../utils';
import {List,Modal,Toast} from 'antd-mobile';
import {reqGetCompany,reqSetCompany,reqUserInfoUpdate,reqUploadLog} from '../../api';
import { withRouter } from 'react-router-dom'
const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
class EmployerConfirmModal extends Component {
  state = {
    title:'',
    rightButton:'',
    avatar:'',
    name:'',
    email:'',
    job:'',
    gender:1,
    companyData:''
  };
  init = (modalName)=>{
    let obj = initNav(modalName);
    this.setState({
      title:obj.title,
      rightButton:obj.rightButton
    })
  };
  back = () =>{
    if(this.props.data.companyData){
      this.props.setModal('setCompanyModal',this.props.data.companyData);
    }else{
      this.props.isShow();
    }
  };
  confirm = ()=>{
	  alert('注册', '确定当前信息吗', [
		  { text: '取消', onPress: () => console.log('cancel') },
		  { text: '确定', onPress: async () =>{
				  const result = await reqGetCompany({name:this.state.companyData.name});
				  const companyDataReq = result.data.data;
				  let userData = {
					  name:this.state.name,
					  gender:this.state.gender,
					  email:this.state.email,
					  job:this.state.job,
					  modified:true
				  };
				  if(companyDataReq){
					  userData.company=companyDataReq._id;
				  }else{
					  let companyData = this.state.companyData;
					  const upResponse = await reqUploadLog(this.state.companyData.formData);
					  if(upResponse.data.data.url){
						  companyData.logo = upResponse.data.data.url;
					  }
					  const response= await reqSetCompany(companyData);
					  userData.company=response.data.data._id;
				  }
				  const resultFinal = await reqUserInfoUpdate(userData);
				  if(resultFinal.data.doc){
				  	if(this.props.modified){
						  this.props.history.goBack();
						  Toast.success('修改成功',1)
					  }else{
						  this.props.history.replace('/postRequire');
						  Toast.success('设置成功',1)
					  }
				  }
			  } },
	  ])

  };
  componentDidMount() {
    //同步接收prop
    this.init(this.props.modalName);
    if(this.props.data.name){
      const data = this.props.data;
      this.setState({
        avatar:data.avatar,
        name:data.name,
        email:data.email,
        gender:data.gender,
        job:data.job
      });
      if(data.companyData){
        this.setState({
          companyData:data.companyData
        });
      }
    }
  }
  async componentWillReceiveProps(nextProps, nextContext) {
    //异步接收prop
    const data = nextProps.data;
    this.setState({
      avatar:data.avatar,
      name:data.name,
      email:data.email,
      gender:data.gender,
      job:data.job
    });
    const result = await reqGetCompany({name:data.company});
    const companyData= result.data.data;
    this.setState({
      companyData:companyData
    });
  }

  render() {
    const {title,rightButton,avatar,name,email,companyData} = this.state;
    return (
      <div id='employer_confirm'>
        <Nav title={title} click={this.back} right={<span onClick={this.confirm}>{rightButton}</span>}/>
        <List>
          <Item
            thumb={avatar}
          >
            {name}
            <Brief>{email}</Brief>
          </Item>
        </List>
        <div className='space' style={{height:'1%'}}></div>
        <List>
          <Item
            thumb={companyData.logo}
          >
            {companyData.name}
            <Brief>{companyData.shortName}</Brief>
          </Item>
          <Item
            extra={companyData.scale}
          >
            公司规模
          </Item>
          <Item
            extra={companyData.stage}
          >
            发展阶段
          </Item>
          <Item
            extra={companyData.address?getAddress(companyData.address):''}
          >
            公司地址
          </Item>
        </List>
      </div>
    );
  }
}

export default withRouter(EmployerConfirmModal);
