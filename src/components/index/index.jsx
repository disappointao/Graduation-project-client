import React, {Component} from 'react';
import {Flex,WhiteSpace,Button} from "antd-mobile";

import './index.less'
import Logo from '../logo/logo';
class Index extends Component {
    render() {
        return (
            <div className='container'>
                <div className='flex-container'>
                    <Flex justify="center">
                        <Logo/>
                    </Flex>
                    <Flex>
                        <Flex.Item><Button type='primary'>已有账号</Button></Flex.Item>
                        <Flex.Item><Button type='primary'>新手注册</Button></Flex.Item>
                    </Flex>
                </div>
            </div>
        );
    }
}

export default Index;
