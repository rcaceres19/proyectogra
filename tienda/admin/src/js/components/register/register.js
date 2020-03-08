import React, {Component} from 'react';
import firebase from '../../../firebase';
import { withRouter } from 'react-router-dom';
import "../../../css/components/subscribe/subscribe.scss";
import Swal from 'sweetalert2';

class Subscribe extends Component {    
    constructor(props) {
        super(props);


        console.log(props);
        this.state = {
                company: "",
                rtn: "",
                email: "",
                password: "",
                faddress: "",
                saddress: "",
                tel: "",
                type: 'company'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        let val = e.target.value
        
        this.setState({
            ...this.state,
            [e.target.name] : val 
        })
    }
    
    handleSubmit() {
        
        const { email, password } = this.state


        firebase.auth().createUserWithEmailAndPassword(email, password).then((users) => {
            Swal.fire({
                icon: 'success',
                title: 'Felicidades',
                text: 'Hemos creado tu cuenta, seras redirigido a la pagina principal',
                confirmButtonText: '<a class="fa fa-thumbs-up"></a> Genial!',

            })
            this.addToDatabase(users)
            this.props.history.push('/home');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if( errorCode == "auth/email-already-in-use") {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario en uso',
                    text: 'Lamentablemente el email ya ha sido usado',
                    confirmButtonText: '<a class="fa fa-thumbs-up"></a> Genial!',
                }) 
            }
        }) 
        
    }


    addToDatabase() {
        const users = firebase.auth().currentUser.uid;
        const {company, rtn, email, faddress, saddress, tel, type} = this.state
        
        firebase.database().ref('companies/' + users).set({
            company: company,
            rtn: rtn,
            email: email,
            faddress: faddress,
            saddress: saddress,
            tel: tel
        });

        firebase.database().ref('users/' + users).set({
            email: email,
            type: type
        })
    }


    render() {
        return(
            <div className="container">
                <article className="panel is-primary">
                    <p className="panel-heading">
                        Suscribete como vendedor en City Queen Shop
                    </p>
                    <div className="content">
                        <div className="field">
                            <label className="label">Empresa</label>
                            <div className="control has-icons-left">
                                <input type="text" name="company" className="input" onChange={this.handleChange} />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">RTN</label>
                            <div className="control has-icons-left">
                                <input type="text" name="rtn" className="input" onChange={this.handleChange} />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-id-card "></i>
                                </span>
                            </div>
                            
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left">
                                <input type="text" name="email" className="input" onChange={this.handleChange} />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input type="password" name="password" className="input" onChange={this.handleChange} />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-key"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Telefono </label>
                            <div className="control has-icons-left">
                                <input type="text" name="tel" className="input" onChange={this.handleChange}></input>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-phone "></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Direccion #1</label>
                            <div className="control has-icons-left">
                                <input type="text" name="faddress" className="input" onChange={this.handleChange}></input>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-home "></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Direccion #2</label>
                            <div className="control has-icons-left">
                                <input type="text" name="saddress" className="input" onChange={this.handleChange}></input>
                                <span className="icon is-small is-left">
                                    <i className="fa fa-home "></i>
                                </span>
                            </div>
                        </div>
                        {/* <div className="field">
                            <input type="checkbox" name="tc"></input>
                            <label>Acepto los terminos y condiciones</label>
                        </div> */}
                        <button className="button is-primary" onClick={this.handleSubmit} value="Submit">Submit</button>
                    </div>
                </article>
            </div>
        )
    }
}

export default withRouter(Subscribe);