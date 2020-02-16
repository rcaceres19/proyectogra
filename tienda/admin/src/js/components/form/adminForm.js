import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: [{name: 's', type: 's', products: [{
                class: 'ropa', name: 'Camisa Polo', precio: 252 }]
            },{name: 'd', type: 'd', products: [{
                class: 'ropa', name: 'Camisa Polo', precio: 300 },{
                class: 'hogar', name: 'Marco para fotografia', precio: 50 }]
            }]
        }
    }

    handleChange = (event) => {
        this.company.setState({
            name: event.target.value
        })
    }

    render() {
        return(
            <div className="App"> 
                <form>
                    <input type="text" name="company" value={this.state.company.name} onChange={this.handleChange} />
                </form>
                {console.log(this.state.company)}
            </div>
        );
    }
}

export default Form;