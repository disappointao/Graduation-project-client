import React, {Component} from 'react';
import Nav from '../../components/nav/nav';
import {List,NoticeBar,WhiteSpace,InputItem,Picker} from 'antd-mobile';
import {initNav} from '../../utils';
import {companyScale,companyStage} from '../../utils';
import  cityData from '../../utils/cityInfo';
import defaultLogo from '../../assets/img/avatar/companyLogo.jpeg';

const Item = List.Item;
const Brief = Item.Brief;
let formData = new FormData();

class SetCompanyModal extends Component {
  state={
    title:'',
    rightButton:'',
    shortName:'',
	  brief:'',
    logo:'',
    oldLogo:'',
    scale:'',
    stage:"",
    address:''
  };
  init = (modalName)=>{
    let obj = initNav(modalName);

    this.setState({
      title:obj.title,
      rightButton:obj.rightButton
    })
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
        formData.append('company',file);
        this.setState({
          logo:reader.result
        });
      }
    }
  };
  setShortName = (val)=>{
    this.setState({
      shortName:val
    })
  };
	setBrief = (val)=>{
		this.setState({
			brief:val
		})
	};
  build = ()=>{
    const {shortName,brief,logo,stage,scale,address} = this.state;
    if(shortName&&brief&&logo&&stage&&scale&&address){
      let userObj = this.props.data;
      let companyObj = {};
      companyObj.name = userObj.company;
      companyObj.shortName = shortName;
	    companyObj.brief = brief;
      companyObj.stage = stage[0];
      companyObj.scale = scale[0];
      companyObj.address = address.join(',');
      companyObj.logo = logo;
      companyObj.formData =formData;
      this.props.setModal('employerConfirmModal',companyObj);
    }
  };
  componentDidMount() {
    this.init(this.props.modalName);
    let obj = this.props.data.companyData;
    if(obj){
      this.setState({
        shortName:obj.shortName,
        stage:[obj.stage],
        scale:[obj.scale],
        logo:obj.logo,
        address:obj.address.split(',')
      });
      formData = obj.formData;
    }
  }
  render() {
    const {title,rightButton,logo,shortName,brief,stage,scale,address} = this.state;

    const {avatar,name,job,company} = this.props.data;
    return (
      <div id='set_company' style={{height:'100%',position:'relative'}}>
        <Nav title={title} click={this.props.isShow} right={<span style={{color:shortName&&logo&&stage&&scale&&address ?'':'rgba(84,160,255,0.5)'}} onClick={this.build}>{rightButton}</span>}/>
        <List>
          <WhiteSpace/>
          <NoticeBar>
            系统中未查找到此公司，请填写注册或返回重新选择
          </NoticeBar>
          <Item
          thumb={avatar}
          >
            {name}
            <Brief>{job}</Brief>
          </Item>
        </List>
        <div className='space'></div>
        <List>
          <Item
          extra={company}
          >
            公司全称
          </Item>
          <InputItem placeholder='请输入' defaultValue={company} value={shortName} onChange={this.setShortName}>公司简称</InputItem>
	        <InputItem placeholder='请输入'  value={brief} onChange={this.setBrief}>特色介绍</InputItem>
          <input
            type="file"
            name='avatar'
            accept="image/gif,image/jpeg,image/x-png"
            style={{position:'absolute',left:'-999px',width:"0px",opacity:'0'}}
            ref='imgFile'
            onChange={()=>{this.imgChange()}}
          />
          <Item extra={
            <label style={{position:'relative'}}>
              <img src={logo?logo:defaultLogo}  alt="" style={{height:'70px',width:'70px',borderRadius:'50%'}}/>
            </label>
          } arrow="horizontal" onClick={()=>this.refs.imgFile.click()} platform="android" >公司logo</Item>
        </List>
        <div className='space' style={{padding:'15px',color:'#777777',fontWeight:'400',height:'5%'}}>简称作为招聘时展示的公司名称，请务必准确填写。</div>
        <List>
          <Picker
            data={cityData}
            title="公司地址"
            extra="请选择"
            value={address}
            onChange={v => this.setState({ address: v })}
            onOk={v => this.setState({ address: v })}
          >
            <List.Item arrow="horizontal">公司地址</List.Item>
          </Picker>
          <Picker
            data={companyScale}
            title="公司规模"
            cascade={false}
            extra="请选择"
            value={scale}
            onChange={v => this.setState({ scale: v })}
            onOk={v => this.setState({ scale: v })}
          >
            <List.Item arrow="horizontal">公司规模</List.Item>
          </Picker>
          <Picker
            data={companyStage}
            title="发展阶段"
            cascade={false}
            extra="请选择"
            value={stage}
            onChange={v => this.setState({ stage: v })}
            onOk={v => this.setState({ stage: v })}
          >
            <List.Item arrow="horizontal">发展阶段</List.Item>
          </Picker>
        </List>
        <div style={{width:'100%',height:'50px',position:'absolute',lineHeight:'50px',textAlign:'center',bottom:'0px',color:'#666666',fontWeight:'400'}}>
          "新建"后将为你创建新公司并开通招聘服务
        </div>
      </div>
    );
  }
}

export default SetCompanyModal;
