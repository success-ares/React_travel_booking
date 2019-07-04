import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Login from '../../auth/Login';
import { getAuth, logoutAuth } from '../../../service/auth';
 


class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            username:''
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        let auth = getAuth();
        if (auth.token) {
            this.setState({ username: auth.username });
        }
    }

    logout() {
        logoutAuth();
        window.location.href = '/';
    }

    render() {
        return (
            <header id="header">
                <div className="header-top">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-sm-6 col-6 header-top-left">
                                <ul>
                                    <li><Link to="/">Visit Us</Link></li>
                                    
                                </ul>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-6 header-top-right">
                                
                                <div className="header-social">
                                
                                            
                                            {(this.state.username === '')
                                             ?
                                             <Login/>
                                             :
                                            <a href="#" onClick={this.logout}>{this.state.username} / Logout</a>} 
                                    
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-dribbble"></i></a>
                                    <a href="#"><i className="fa fa-behance"></i></a>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container main-menu">
                    <div className="row align-items-center justify-content-between d-flex">
                        <div id="logo">
                            <a href="/"><img src="img/logo.png" alt="" title="" /></a>
                        </div>
                        <nav id="nav-menu-container">
                            <ul className="nav-menu">
                                <li><a href="#">Flights</a></li>
                                <li><a href="#">Car2Fly</a></li>
                                <li><a href="#">Hotels</a></li>                        
                                
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }

}

export default Header;
  