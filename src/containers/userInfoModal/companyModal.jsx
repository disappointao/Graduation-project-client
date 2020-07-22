import React, {Component} from 'react';
import {List,InputItem} from 'antd-mobile';
import {reqSearchCompany} from '../../api';
import Nav from '../../components/nav/nav';
import {initNav} from '../../utils';

const Item = List.Item;
class CompanyModal extends Component {
  state={
    title:'',
    rightButton: '',
    isClick:true,
    value:this.props.data.companyName?this.props.data.companyName:'',
    companyList:[
    ]
  };
  init = (modalName)=>{
    let obj = initNav(modalName);
    this.setState({
      title:obj.title,
      rightButton:obj.rightButton
    })
  };
  rightClick = (value)=>{
    if(this.state.isClick){
      this.props.data.click(value);
      this.props.isShow();
    }
  };
  searchCompany = async (val) => {
    this.setState({
      value:val
    });
    if(val && val!=='公司'){
      const response = await reqSearchCompany({name:val});
      const result = response.data;
      if(result.code === 0 ){
        this.setState({
          companyList:result.data,
          isClick:true
        })
      }
    }else{
      this.setState({
        companyList:[],
        isClick:false
      })
    }
  };
  componentDidMount() {
    this.init(this.props.modalName);
    if(!this.state.value){
      this.setState({
        isClick:false
      })
    }
  }
  render() {
    const {value,companyList,title,rightButton,isClick} = this.state;
    return (
      <div id='company_modal'>
        <Nav title={title} click={this.props.isShow} right={<span style={{color:isClick?'':'rgba(84,160,255,0.5)'}} onClick={()=>this.rightClick(value)}>{rightButton}</span>} style={{marginBottom:'10px',boxShadow: '0 2px 5px 2px rgba(33,36,53,0.1)'}}/>
        <List renderHeader={() => '公司名称为招聘所在公司全称'} className="my-list">
          <InputItem autoFocus='autoFocus' ref='input' placeholder='请输入公司名' value={value} clear onChange={this.searchCompany}/>
        </List>
        <ul style={{paddingLeft:'35px',display:companyList.length === 0?'':'none'}}>
          <li>示例：深圳市腾讯计算机系统有限公司</li>
        </ul>
        <List style={{display:companyList.length !== 0?'':'none'}}>
          {companyList.map((company,i) => <Item key={i} onClick={() => this.rightClick  (company.name)}>{company.name}</Item>)}
        </List>
      </div>
    );
  }
}

export default CompanyModal;
