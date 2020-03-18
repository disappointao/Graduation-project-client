import React, {Component} from 'react';

import logo from '../../assets/img/logo.jpg'
import './logo.less'

class Logo extends Component {
    render() {
        return (
            <div className='logo-container'>
                <img src={logo} className='logo'/>
            </div>
        );
    }
}

export default Logo;
