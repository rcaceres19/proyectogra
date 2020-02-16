import React, {Component} from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';
import Register from '../register/register';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Login extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: ""
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passHandler = this.passHandler.bind(this);
    }

    emailHandler(e){
        const val = e.target.value;

        this.setState({ email: val });
        console.log(this.state.email);
    }

    passHandler(e){
        const val = e.target.value;

        this.setState({ password: val });
        console.log(this.state.password);
    }

    handleSubmit(e){
        e.preventDefault();

        const {email, password} = this.state;
        console.log(email, password);
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
            this.props.history.push('/');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render() {
        return(
            <div>
                <form  onSubmit={this.handleSubmit}>
                    <section>   
                        <label>Email
                            <input type="text" onChange={ this.emailHandler } />
                        </label>
                    </section>
                    <section>   
                        <label>Password
                            <input type="text" onChange={ this.passHandler } />
                        </label>
                    </section>
                    <input type="submit" value="Submit"/>
                </form>     
            </div>
        )
    }


}

export default withRouter(Login);