import React, {Component} from 'react';
import firebase from '../../../firebase';
import { withRouter } from 'react-router-dom';
import '../../../css/components/register/register.scss'
import Swal from 'sweetalert2';

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: "",
            type: 'client',
            users: []
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passHandler = this.passHandler.bind(this);
    }

    emailHandler(e){
        const val = e.target.value;

        this.setState({ email: val });
    }

    passHandler(e){
        const val = e.target.value;

        this.setState({ password: val });
    }

    handleSubmit(){
        const {email, password, type} = this.state;
        
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            const userId = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + userId).set({
                email: email,
                type: type,
                cart: []
            });
            Swal.fire({
                icon: 'success',
                title: 'Felicidades',
                text: 'Hemos creado tu cuenta, seras redirigido a la pagina principal',
                confirmButtonText: '<a class="fa fa-thumbs-up"></a> Genial!',
            })
            this.props.history.push('/');
        }).catch((error) => {
            const errorCode = error.code;
            if( errorCode == "auth/email-already-in-use") {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario en uso',
                    text: 'Lamentablemente el email ya ha sido usado',
                    confirmButtonText: '<a class="fa fa-thumbs-up"></a> Genial!',
                }) 
            }
        });

        // firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Felicidades',
        //         text: 'Hemos creado tu cuenta, seras redirigido a la pagina principal',
        //         confirmButtonText: '<a class="fa fa-thumbs-up"></a> Genial!',
        //     })
            
            

        //     this.props.history.push('/home');


        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     if( errorCode == "auth/email-already-in-use") {
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Usuario en uso',
        //             text: 'Lamentablemente el email ya ha sido usado',
        //             confirmButtonText: '<a class="fa fa-thumbs-up"></a> Genial!',
        //         }) 
        //     }
        // });
    }

    render() {
        return(
            <div className="container">
                <article className="panel is-info register-form">
                    <p className="panel-heading">
                        Register
                    </p>
                    <div className="content">
                        <div className="field">   
                            <label className="label">Email</label>
                            <div className="control has-icons-left">
                                <input type="text" className="input" placeholder="Example@example.com" onChange={ this.emailHandler } />
                                <span className="icon is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">   
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input type="password" className="input" placeholder="Password" onChange={ this.passHandler } />
                                <span className="icon is-left">
                                    <i className="fa fa-lock "></i>
                                </span>
                            </div>
                        </div>
                        <div className="control">
                            <button className="button is-info"  value="Submit"  onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </article>
            </div>
        )
    }


}

export default withRouter(Register);