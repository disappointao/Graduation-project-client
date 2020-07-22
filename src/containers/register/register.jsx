import React, {Component} from 'react';

import {
  Flex,
  List,
  WingBlank,
  InputItem,
  Switch,
  Radio,
  Button,
  WhiteSpace,
  Toast,
  Modal
} from 'antd-mobile';
import './register.css';
import {createForm} from 'rc-form';
import Cookies from 'js-cookie';
import Logo from '../../components/logo/logo';
import RegisterModal from '../../components/registerModal/registerModal';
import {connect} from 'react-redux';
import {register} from '../../redux/action';
import Nav from '../../components/nav/nav';

import showImg from '../../assets/img/password_show.png';
import hideImg from '../../assets/img/password_hide.png';

const Item = List.Item;

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class Register extends Component {
  state = {
    selectStatus: '',
    passwordShow:false,
    confirmPasswordShow:false,
    modal:false
  };
  passwordShowChange = (type) =>{
    if(type === 'password'){
      this.setState({
        passwordShow:!this.state.passwordShow
      });
    }else{
      this.setState({
        confirmPasswordShow:!this.state.confirmPasswordShow
      });
    }
  };
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val,  // 属性名不是name, 而是name变量的值
    });
  };
  changeStatus = (newState) => {
    this.setState({selectStatus: newState});
  };
  showModal = () => {
    this.setState({
      modal:true
    })
  };
  closeModal = () => {
    this.setState({
      modal:false
    })
  };
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };
  onSubmit = () => {
    this.props.form.validateFields({force: true}, (error) => {
      if (!error) {
        var form = this.props.form.getFieldsValue();
        if(form.password !== form.confirmPassword){
          Toast.fail('密码与确认密码输入不一致',1.5);
          return;
        }else if(form.username === form.password){
          Toast.fail('用户名不应与密码一致',1.5);
          return;
        }else if(!form.confirm){
          this.showModal();
        }else{
          var obj = this.props.form.getFieldsValue();
          var user = {
            username:obj.username,
            password:obj.password,
            status:this.state.selectStatus === 'employee' ? 0 : 1
          };
          this.props.register(user);
          Toast.loading('注册中...',2,()=>{
            if(this.props.username && this.props.msg===''){
              setTimeout(()=>{
                Toast.success('注册成功', 1);
                Cookies.remove('user');
                this.props.history.replace('/login');
              },200);
            }
            if(this.props.msg){
              setTimeout(()=>{
                Toast.fail(this.props.msg, 1.5);
              },200);
            }
          });
        }
      } else {
        Toast.fail('检查是否填写完整',1.5);
      }
    });
  };
  onReset = () => {
    this.props.form.resetFields();
  };
  validateUsername = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('用户名最短为四位数'));
    }
  };
  validatePassword = (rule, value, callback) => {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;

    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('密码有6到16位英文和数字组成'));
    }
  };
  toLogin = () => {
    this.props.history.replace('/login');
  };
  toHome = () => {
    this.props.history.replace('/');
  };

  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    const {selectStatus,passwordShow,confirmPasswordShow,modal} = this.state;
    return (

      <div className='container'>
        {
          this.state.selectStatus ===''?<RegisterModal isSelect={this.state.selectStatus}
                                                       selectStatus={this.changeStatus}/>:
            <div className='flex-container'>
              <Modal
                visible={modal}
                transparent
                maskClosable={false}
                onClose={this.closeModal}
                footer={[{ text: '确定', onPress: () => {  this.closeModal(); } }]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
              >
                请确认表单信息
              </Modal>
              <Nav title='注册账号' click={this.toHome} style={{background:'#f2b564',color:'#fff',position:'absolute',top:'0',width:'100%'}}/>
              <Flex justify="center" style={{padding: '80px 0 50px'}}>
                <Logo/>
              </Flex>
              <WingBlank>
                <form>
                  <List>
                    <InputItem
                      {...getFieldProps('username', {
                        // initialValue: 'little ant',
                        rules: [
                          {required: true, message: '请输入用户名'},
                          {validator: this.validateUsername},
                        ],
                      })}
                      clear
                      error={!!getFieldError('username')}
                      onErrorClick={() => {
                        Toast.fail(getFieldError('username').join('、'),1.5);
                      }}
                      placeholder="请输入用户名"
                    >用户名:</InputItem>
                    <InputItem extra={<img alt='密码控制' src={passwordShow?hideImg:showImg} onClick={() => {this.passwordShowChange('password')}} style={{height:'100%'}}/>} {...getFieldProps('password', {
                      // initialValue: 'little ant',
                      rules: [
                        {required: true, message: '请输入密码'},
                        {validator: this.validatePassword},
                      ],
                    })} clear error={!!getFieldError('password')}
                               onErrorClick={() => {
                                 Toast.fail(getFieldError('password').join('、'),1.5);
                               }} placeholder="请输入密码"
                               type={passwordShow?'text':'password'}>
                      密码:
                    </InputItem>
                    <InputItem extra={<img alt='密码控制' src={confirmPasswordShow?hideImg:showImg} onClick={() => {this.passwordShowChange('')}} style={{height:'100%'}}/>} {...getFieldProps('confirmPassword', {
                      // initialValue: 'little ant',
                      rules: [
                        {required: true, message: '请输入密码'},
                        {validator: this.validatePassword},
                      ],
                    })} clear error={!!getFieldError('confirmPassword')}
                               onErrorClick={() => {
                                 Toast.fail(getFieldError('confirmPassword').join('、'),1.5);
                               }} placeholder="请输入确认密码"
                               type={confirmPasswordShow?'text':'password'}>
                      确认密码:
                    </InputItem>
                    <Item>
                      <span>用户类型:</span>
                      <Radio className="my-radio"
                             checked={selectStatus === 'employer'}
                             onClick={() => this.handleChange('selectStatus',
                               'employer')}
                             style={{float: 'right', marginLeft: '10px'}}>老板</Radio>
                      <Radio checked={selectStatus === 'employee'}
                             className="my-radio"
                             onChange={() => this.handleChange('selectStatus',
                               'employee')} style={{float: 'right'}}>大神</Radio>
                    </Item>
                    <Item
                      extra={<Switch {...getFieldProps('confirm',
                        {initialValue: false, valuePropName: 'checked'})} />}
                    >确定提交信息</Item>
                    <Item>
                      <Button size="small" type='primary' inline style={{float:'right'}}
                              onClick={this.onReset}>重置</Button>
                    </Item>
                  </List>
                  <WhiteSpace/>
                  <Button type="primary" onClick={this.onSubmit}>确定</Button>
                  <WhiteSpace/>
                  <Button onClick={this.toLogin}>已有账户</Button>
                </form>
              </WingBlank>
            </div>
        }
      </div>
    );
  }
}

const RegisterForm = createForm()(Register);
export default connect(
  state => state.user,
  {register}
)(RegisterForm)




