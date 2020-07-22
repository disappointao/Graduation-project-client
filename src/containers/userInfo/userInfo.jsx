import React, {Component} from 'react';
import EmployeeInfo from './employeeInfo';
import EmployerInfo from './employerInfo';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class UserInfo extends Component {
  componentDidMount() {
    if(!this.props.username){
      this.props.history.replace('/login');
    }
  }
  render() {
    return (
      <div id='user_info' style={{height:'100%'}}>
        {this.props.status ===0? <EmployeeInfo   modified={this.props.location.query.modified}/>:<EmployerInfo modified={this.props.location.query.modified} />}
      </div>
    );
  }
}

export default connect(state=>state.user)(withRouter(UserInfo));
