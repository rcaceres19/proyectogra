import React, {Component} from 'react';
import firebase from '../../../firebase';
import "../../../css/components/subscribe/subscribe.scss";

class Subscribe extends Component {    
    constructor(props) {
        super(props);


        console.log(props);
        this.state = {
                company: "",
                rtn: "",
                email: "",
                faddress: "",
                saddress: "",
                tel: "",
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
        const userId = firebase.auth().currentUser.uid;
        const {company, rtn, email, faddress, saddress, tel} = this.state


        firebase.database().ref('companies/' + userId).set({
            company: company,
            rtn: rtn,
            email: email,
            faddress: faddress,
            saddress: saddress,
            tel: tel
        });
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

export default Subscribe;