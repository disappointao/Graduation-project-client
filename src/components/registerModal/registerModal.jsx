import React, {Component} from 'react';
import {Button} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import './registerModal.css';
import logo from '../../assets/img/timg.jpeg';
class RegisterModal extends Component {
  static propTypes = {
    isSelect:PropTypes.string,
    selectStatus:PropTypes.func
  };
  toHome = ()=> {
    this.props.history.replace('/')
  };
  render() {
    return (
      <div className='register-modal-container' style={this.props.isSelect?{display:'none',transition:'1s'}:{display:'flex',transition:'1s'}}>
        <div className='modal-item'>
          <div className='modal-item-logo'>
            <img  alt='找工作' src={logo} className='find-job'/>
          </div>
          <Button type='primary' className='modal-btn' onClick={ () => this.props.selectStatus('employee')}>我要找工作</Button>
        </div>
        <div className='modal-mid-item'>
          <div></div>
          <span>或者</span>
          <div></div>
        </div>
        <div className='modal-item'>
          <div className='modal-item-logo'>
            <img alt='招聘' src={logo} className='find-people'/>
          </div>
          <Button type='primary' className='modal-btn' onClick={ () => this.props.selectStatus('employer')}>我要招人</Button>
          <span className='return-index' onClick={this.toHome} style={{color:'#909090'}}>返回</span>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterModal);
