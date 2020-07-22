import React, {Component} from 'react';
import {
  Flex,
  List,
  WingBlank,
  InputItem,
  Button,
  WhiteSpace,
  Toast
} from 'antd-mobile';
import {connect} from 'react-redux';
import {createForm} from 'rc-form';
import Logo from '../../components/logo/logo';
import {login,getUserInfo} from '../../redux/action';
import Nav from '../../components/nav/nav';

import showImg from '../../assets/img/password_show.png';
import hideImg from '../../assets/img/password_hide.png';


const Item = List.Item;

class Login extends Component {
  state = {
    passwordShow:false
  };
  onSubmit = () => {
    this.props.form.validateFields({force: true}, (error) => {
      if (!error) {
        this.props.login(this.props.form.getFieldsValue());
        Toast.loading('登录中...',2,()=>{
          if(this.props.username && this.props.msg===''){
            setTimeout(()=>{
              Toast.success('登录成功', 1);
              if(this.props.modified){
              	console.log('登录成功')
	              this.props.getUserInfo({id:this.props.userInfo})
              	this.props.history.replace('/home')
              }else{
	              this.props.history.replace({pathname:"/userInfo",query: { modified : false }});
              }
            },200);
          }
          if(this.props.msg){
            setTimeout(()=>{
              Toast.fail(this.props.msg, 1.5);
            },200);
          }
        });
      } else {
        alert('检查表单是否填写正确');
      }
    });
  };
  onReset = () => {
    this.props.form.resetFields();
  };
  passwordShowChange = () =>{
    this.setState({
      passwordShow:!this.state.passwordShow
    });
  };
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('用户名最短为四位数'));
    }
  };
  toRegister = () => {
    this.props.history.replace('/register');
  };
  toHome = () => {
    this.props.history.replace('/')
  };
  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    const {passwordShow} = this.state;
    return (
      <div className='container'>
        <Nav click={this.toHome} title='登录' style={{background:'#f2b564',color:'#fff',position:'absolute',top:'0',width:'100%'}}/>
        <div className='flex-container'>
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
                      {validator: this.validateAccount},
                    ],
                  })}
                  clear
                  error={!!getFieldError('username')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('username').join('、'), 1.5);
                  }}
                  placeholder="请输入用户名"
                >用户名</InputItem>
                <InputItem extra={<img alt='密码控制' src={passwordShow?hideImg:showImg} onClick={this.passwordShowChange} style={{height:'100%'}}/>} {...getFieldProps('password',{   rules: [
                    {required: true, message: '请输入密码'},
                  ],})} placeholder="请输入密码"
                           clear
                           error={!!getFieldError('password')}
                           onErrorClick={() => {
                             Toast.fail(getFieldError('password').join('、'),1.5);
                           }}
                           type={passwordShow?'text':'password'}
                           >
                  密码
                </InputItem>
                <Item>
                  <Button size="small" type='primary' inline style={{float:"right"}}
                          onClick={this.onReset}>重置</Button>
                </Item>
              </List>
              <WhiteSpace/>
              <Button type="primary" onClick={this.onSubmit}>确定</Button>
              <WhiteSpace/>
              <Button onClick={this.toRegister}>注册账户</Button>
            </form>
          </WingBlank>
        </div>
      </div>
    );
  }
}
const LoginForm = createForm()(Login);
export default connect(
  state => state.user,
  {login,getUserInfo}
)(LoginForm)
