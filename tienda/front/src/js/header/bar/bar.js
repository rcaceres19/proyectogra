import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from '../../components/home/home';
import Login from '../../components/login/login';
import Register from '../../components/register/register';
import Logout from '../../components/logout/logout';
import Poducts from '../../components/products/products';
import ProtectedRoutes from '../../helpers/protectedRoutes';
import logo from '../../../assets/images/logo.png';
import Companies from '../../components/companies/companies';
import Cart from '../../components/cart/cart';
import Confirmation from '../../components/confirmation/confirmation';
import Product from '../../components/product/product';
import SearchBar from '../../components/searchbar';

import '../../../css/components/bar/bar.scss'
import Products from '../../components/products/products';

class Bar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isVisible: false,
            isVisibleSidebar: false,
            newWidth: '',
            WindowSize: window.innerWidth
        }
        this.toogleMenu = this.toogleMenu.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.getWindowWidth = this.getWindowWidth.bind(this);
        this.toogleMenuSidebar = this.toogleMenuSidebar.bind(this);
    }


    // componentDidMount() {
    //     window.addEventListener('resize', this.getWindowWidth);
    // }
    // componentWillUnmount() {
    //     window.addEventListener('resize', null);
    // }

    getWindowWidth(WindowSize , event) {
        this.setState({ WindowSize: window.innerWidth })    
    }

    toogleMenu() {
        this.setState(prevState => ({ isVisible: !prevState.isVisible }));
    }

    toogleMenuSidebar() {
        const element = document.getElementById('menu-sidebar')
        
        this.setState(prevState => ({ isVisibleSidebar: !prevState.isVisibleSidebar }));

        if(this.state.isVisibleSidebar == false) {
            element.classList.add('hidden-sidebar')
        }
    }

    updateWidth(e) {
        const value = e.target.value;
        const length = value.length;
        const newWidth = `${(8*length)+80}px`
        this.setState({newWidth})
    }

    render() {
        const {isVisible, newWidth, WindowSize, isVisibleSidebar} = this.state;
        
        return(
            <Router>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="https://bulma.io">
                            <img src={logo} />
                        </a>
                        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                        </a>
                    </div>
                    <div class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item"><b>Inicio</b></a>
                            <a class="navbar-item"><b>Registrate</b></a>
                            <a class="navbar-item"><b>Afiliados</b></a>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <Link className="navbar-item is-link is-small" to="/cart"><i className="fa fa-shopping-cart" /></Link>     
                        <Link className="navbar-item is-link is-small" to="/login">
                            <span className="icon"><i className="fa fa-sign-in"/></span><b>Inicia Sesion</b>
                        </Link>                                  
                        <Logout auth={this.props.authenticated}/>
                    </div>
                </nav>
                <SearchBar />
                <Switch>
                    <Route exact path="/"  component={Home} />
                    <Route authenticated={this.props.authenticated} path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/products"  component={Poducts} />
                    <Route path="/companies" component={Companies} />
                    <Route path="/product" component={Product} authenticated={true}/>
                    {/* <ProtectedRoutes component={Products} path="/companies" authenticated={this.props.authenticated} /> */}
                    <ProtectedRoutes component={Confirmation} path="/confirmation" authenticated={this.props.authenticated} />
                    <ProtectedRoutes component={Cart} path="/cart" authenticated={this.props.authenticated} />
                </Switch>
            </Router>
        )
    }
}

export default Bar;
