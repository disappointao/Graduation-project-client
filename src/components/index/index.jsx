import React, {Component} from 'react';
import {Flex, WhiteSpace, Button, WingBlank} from 'antd-mobile';

import './index.less'
import Logo from '../logo/logo';
class Index extends Component {
    toLogin = () => {
        this.props.history.replace('/login');
    };
    toRegister = () => {
        this.props.history.replace('/register');
    };
    toHome = () => {
        this.props.history.replace('/home')
    };
    render() {
        return (
            <div className='container'>
                <div className='flex-container'>
                    <Flex justify="center" style={{padding:'80px 0 50px'}}>
                        <Logo/>
                    </Flex>
                    <WingBlank size='lg'>
	                    <Button type='primary' onClick={this.toLogin}>已有账号</Button>
                    </WingBlank>
                    <WhiteSpace/>
                    <WingBlank size='lg'>
	                    <Button type='primary' onClick={this.toRegister}>新手注册</Button>
                    </WingBlank>
                </div>

            </div>
        );
    }
}

export default Index;
