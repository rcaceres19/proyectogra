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
import Sidebar from '../../components/sidebar/sidebar';

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
            <div className="bar-view ">
                <Router>                
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                    
                    <div className="navbar-brand">
                        {/* <a role="button" onClick={this.toogleMenuSidebar} className="navbar-burger burger active" aria-label="menu" aria-expanded="false" data-target="menu-sidebar">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a> */}
                        <a className="navbar-item" href="/">
                            <img src={logo} className="logo-png" />
                        </a>
                        <a role="button" onClick={this.toogleMenu} className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                        { this.props.authenticated ?                    
                            <div id="navbarBasicExample" className={`navbar-menu ${isVisible ? "is-active" : "hidden"}`}>
                                <div className="navbar-start">
                                    <Link className="navbar-item" to="/">Home</Link>
                                    <Link className="navbar-item" to="/companies">Compañias</Link>
                                    <Link className="navbar-item" to="/products">Productos</Link>
                                    {
                                    WindowSize > 1024 ? 
                                        <div className="filter-container navbar-item">
                                            <div className="field has-addons has-addons-right">
                                                <div className="control">
                                                    <div className="select select-container">
                                                        <select 
                                                        style={{width: newWidth}}
                                                        className="category-select" 
                                                        onChange={this.updateWidth}>
                                                            <option hidden={true}>Buscar en...</option>
                                                            <option value="cuidado personal">Cuidado Personal</option>
                                                            <option value="deporte">Deporte</option>
                                                            <option value="electrodomesticos">Electrodomésticos</option>
                                                            <option value="escolar y oficinas">Escolar y Oficina</option>
                                                            <option value="electronica">Electrónica</option>
                                                            <option value="hogar">Hogar</option>
                                                            <option value="ropa y accesorios">Ropa y Accesorios</option>
                                                            <option value="mundo del bebe">Mundo del Bebé</option>

                                                        </select>
                                                    </div>
                                                </div>
                                                <p className="control input-control">
                                                    <input className="input" type="text" placeholder="Amount of money" />
                                                </p>
                                                <p className="control">
                                                    <a className="button is-primary">
                                                        <i className="fa fa-search"></i>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    :
                                        ""
                                    }
                                </div>
                                <div className="navbar-end"> 
                                    <Link className="navbar-item" to="/cart">
                                        <button className="shopping-button button is-link">
                                            <i className="fa fa-shopping-cart" />
                                        </button>
                                    </Link>                                      
                                    <Logout />
                                </div>
                            </div>
                        :
                            <div id="navbarBasicExample" className={`navbar-menu ${isVisible ? "is-active" : "hidden"}`}>
                                <div className="navbar-start">
                                    
                                    <Link className="navbar-item" to="/">Home</Link>
                                    <Link className="navbar-item" to="/companies">Compañias</Link>
                                    <Link className="navbar-item" to="/products">Productos</Link>
                                </div>
                                <div className="navbar-end">
                                    <Link className="navbar-item is-primary" to="/login">
                                        <button className="button is-primary log-button">Acceder</button>
                                    </Link>
                                    <Link className="navbar-item" to="/register">
                                        <button className="button is-primary log-button">Registrar</button>
                                    </Link>
                                </div>
                            </div>    
                        } 

                        {/* <div id="menu-sidebar" className={`sidebar-menu ${isVisibleSidebar ? "is-active" : "hidden"}`}>

                        </div> */}
                    </nav>
                        
                    <Switch>
                        <Route exact path="/"  component={Home} />
                        <Route authenticated={this.props.authenticated} path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/products"  component={Poducts} />
                        <Route path="/companies" component={Companies} />
                        <Route path="/product" component={Product} authenticated={this.props.authenticated}/>
                        {/* <ProtectedRoutes component={Products} path="/companies" authenticated={this.props.authenticated} /> */}
                        <ProtectedRoutes component={Confirmation} path="/confirmation" authenticated={this.props.authenticated} />
                        <ProtectedRoutes component={Cart} path="/cart" authenticated={this.props.authenticated} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Bar;