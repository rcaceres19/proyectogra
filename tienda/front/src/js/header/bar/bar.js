import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../../components/home/home';
import Subscribe from '../../components/subscribe/subscribe';
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import Logout from '../../components/logout/logout';
import Card from '../../components/card/card';
import ProtectedRoutes from '../../helpers/protectedRoutes';
import '../../../css/components/bar/bar.sass'

class Bar extends Component{
    constructor(props){
        super(props);

    }
    
    render() {
        console.log(this.props.authenticated);
        return(
            <div>
                <Router>                
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="container">                       
                            { this.props.authenticated ?                    
                                <div className="navbar-menu">
                                    <div className="navbar-start">
                                        <Link className="navbar-item" to="/home">Home</Link>
                                        <Link className="navbar-item" to="/subscribe">Subscribe</Link>                                       
                                        <Logout />
                                    </div>
                                </div>
                            :
                                <div className="navbar-menu">
                                    <div className="navbar-start">
                                        <Link className="navbar-item" to="/home">Home</Link>
                                    </div>
                                    <div className="navbar-end">
                                        <Link className="navbar-item is-primary" to="/login">
                                            <button className="button is-primary log-button">Login</button>
                                        </Link>
                                        <Link className="navbar-item" to="/register">
                                            <button className="button is-primary log-button">Register</button>
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>    
                    </nav>

                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route authenticated={this.props.authenticated} path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <ProtectedRoutes component={Subscribe} path="/subscribe" authenticated={this.props.authenticated} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Bar;