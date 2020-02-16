import React, {Component} from 'react';
import firebase from '../../../firebase';

class Subscribe extends Component {    
    constructor(props) {
        super(props);


        console.log(props);
        this.state = {
            company: {
                name: "",
                email: "",
                pass: "",
                tel: "",
                address: "",
                country: "",
                zc: 0,
                tc: false
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(name, e) {
        let val = e.target.value
        const company = this.state.company;
        company[name] = val;
        this.setState({ company: company  })
    }
    
    handleSubmit() {
        const fireStore = firebase.firestore();
        const db = fireStore.collection("test");

        db.doc().set({
            name: this.state.company.name,
            tel: this.state.company.tel,
            address: this.state.company.address,
            country: this.state.company.country,
            zc: this.state.company.zc,
            tc: this.state.company.tc
        }).then(() => {
            console.log('Data Saved');
        }).catch((e) => {
            console.log(e);
        })

        firebase.database()

    }



    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <section>
                        <label>Empresa
                            <input type="text" name="name" onChange={this.handleChange.bind(this, 'name')}></input>
                        </label>
                    </section>
                    <section>
                        <label>Telefono
                            <input type="text" name="tel" onChange={this.handleChange.bind(this, 'tel')}></input>
                        </label>
                    </section>
                    <section>
                        <label>Direccion
                            <input type="text" name="address" onChange={this.handleChange.bind(this, 'address')}></input>
                        </label>
                    </section>
                    <section>
                        <label>Pais
                            <input type="text" name="country" onChange={this.handleChange.bind(this, 'country')}></input>
                        </label>
                    </section>
                    <section>
                        <label>Codigo Postal
                            <input type="text" name="zc" onChange={this.handleChange.bind(this, 'zc')}></input>
                        </label>
                    </section>
                    <section>
                        <input type="checkbox" name="tc"></input>
                        <label>Acepto los terminos y condiciones</label>
                    </section>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default Subscribe;