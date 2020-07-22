import React, {Component} from 'react';
import Nav from '../../components/nav/nav';
import {Modal,Toast} from 'antd-mobile';

import defaultImg from '../../assets/img/avatar/employee1.png';
const alert = Modal.alert;
class Introduction extends Component {
  state = {
    value:this.props.value
  };
  saveData = ()=>{
    if(this.refs.textarea.value){
      this.props.setIntroduction(this.refs.textarea.value);
      this.props.setModal();
    }else{
      Toast.fail('未填写',1);
    };
  };
  render() {
    const {value} =this.state;
    return (
      <div id='introduction'>
        <Nav click={
          () =>
            alert('返回', '未保存，确定返回吗', [
              { text: '取消', onPress: () => console.log('取消') },
              { text: '返回', onPress: () => this.props.setModal() },
            ])
        } right={<span onClick={this.saveData}>保存</span>}/>
        <div className='introduction-head'>
          <p>个人优势</p>
          <textarea placeholder='个人介绍主要是关于你的能力，特长和成就'
                    maxLength={150}
                    ref='textarea'
                    defaultValue={value}
          />
          <div style={{background:'#f5f4f9',height:'2px',margin:'10px 0'}}></div>
          <span>最多150汉字</span>
        </div>
        <div className='introduction-template'>
          <div className='template-head'>
            <img src={defaultImg} alt="头像"/>
            <span className='template-head-left'>web前端</span>
            <span className='template-head-right'>示例</span>
          </div>
          <div className='template-content'>
            3年以上经验，有带领工作团队经验，积极向上，有良好的人际沟通能力，良好的工作协调能力，踏实肯干的工作精神，不断学习新技术，对知识有强烈的求知欲，良好的前端编程能力和编程习惯，致力于代码的整体结构规范及优化。
          </div>
        </div>
      </div>
    );
  }
}

export default Introduction;
