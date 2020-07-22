import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import 'react-animated-router/animate.css'; //引入默认的动画样式定义

import Index from "./components/index";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import Home from "./containers/Home/home";
import UserInfo from './containers/userInfo/userInfo';
import PostJob from './containers/postJob/postJob'
import PostRequire from './containers/postRequire/postRequire'
import Chat from './containers/message/chat'
import EmployeeDetail from './containers/employeeList/employeeDetail'
import EmployerDetail from './containers/employerList/employerDetail'
import Resume from './containers/resume/resume'
import AllRequire from './components/allRequire/allRequire'
import AllJob from './components/allJob/allJob'
import CompanyDetail from './containers/companyDetail/companyDetail'
import Space from './containers/space/space'
import PostSpace from './components/postSpace/postSpace'
import Axios from 'axios'
async function test () {
	const response  = await Axios('https://douban.uieee.com/v2/movie/in_theaters',{},'GET');
	console.log(response);
	// fetch('https://avatars.githubusercontent.com/disappoint')
	// .then(response => console.log(response))
	// .then(data => console.log(data))
	// .catch(e => console.log("Oops, error", e))
}
function App() {
    return (
        <Router>
            <Switch>
              <Route path="/" component={Index} exact/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/home" component={Home}/>
              <Route path="/userInfo" component={UserInfo}/>
	            <Route path="/postJob" component={PostJob}/>
	            <Route path="/postRequire" component={PostRequire}/>
	            <Route path='/chat/:id' component={Chat}/>
	            <Route path="/employeeDetail/:id" component={EmployeeDetail}/>
	            <Route path="/employerDetail/:id" component={EmployerDetail}/>
	            <Route path="/resume/:id" component={Resume}/>
	            <Route path="/allRequire/:id" component={AllRequire}/>
	            <Route path="/allJob/:id" component={AllJob}/>
	            <Route path="/companyDetail/:id" component={CompanyDetail}/>
	            <Route path="/space" component={Space}/>
	            <Route path="/postSpace/:id" component={PostSpace}/>
              <Redirect from='/*' to='/home'/>
            </Switch>
        </Router>
    )
}
test();
export default App;
