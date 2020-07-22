import React, {Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';

class Nav extends Component {
  render() {
    const style = this.props.style?this.props.style:{};
    const right = this.props.right?this.props.right:'';
    const event = this.props.click?this.props.click:()=>{};
    const title = this.props.title?this.props.title:'';
    return (
      <div id='nav_bar'>
        <NavBar
          mode="light"
          icon={<Icon type="left" size='lg'/>}
          onLeftClick={event}
          rightContent={right}
          style={{...style}}
        >{title}</NavBar>
      </div>
    );
  }
}

export default Nav;
