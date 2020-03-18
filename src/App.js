import React from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Index from "./components/index";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import Main from "./containers/main/main";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' component={Index}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/Main" component={Main}/>
                <Redirect to='/'/>
            </Switch>
        </Router>
    )
}

export default App;
