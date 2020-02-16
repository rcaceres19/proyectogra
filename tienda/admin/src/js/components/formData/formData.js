import React, {Component} from 'react';
import Form from '../form/adminForm.js/index.js.js'

class FormData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: [{name: 's', type: 's', products: [{
                class: 'ropa', name: 'Camisa Polo', precio: 252 }]
            }]
        }
    }




    render() {
        return(
            <div>
                
            </div>
        )
    }

}

export default FormData;