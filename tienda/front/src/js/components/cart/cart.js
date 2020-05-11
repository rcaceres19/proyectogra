import React, {Component} from 'react';
import firebase from '../../../firebase';
import ProductHolder from '../productHolder/productHolder';


import '../../../css/components/productHolder/productHolder.scss';
import '../../../css/components/cart/cart.scss'

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            total: 0,
            paidFor: false,
            loaded: false,
            error: '',
            allProducts: [],
            isFetching: true
        }

        this.buildProducts = this.buildProducts.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
    }

    async componentDidMount() {
        const userId = firebase.auth().currentUser.uid;
        const refDB = '/users/'+userId+'/cart/';

        await firebase.database().ref(refDB).once('value', (snapshot) => {
            if(snapshot.exists()) {
                this.setState({ products: [snapshot.val()] })
            }
        })   
        
        await firebase.database().ref('products/').once('value', (snapshot) => {
            if(snapshot.exists()) {
                this.setState({ allProducts: [snapshot.val()] })
            }
        })

        this.setState({isFetching: false})
    }

    buildProducts() {
        const { products } = this.state;
        let result = products.map((items) => {
            let dataArray = Object.values(items).map((item, index) => {
                return (
                    <ProductHolder
                    key={index} 
                    name={item.data.name}
                    id={item.data.id} 
                    category={item.data.cat} 
                    description={item.data.desc} 
                    price={item.data.price} 
                    images={item.data.images}
                    featured={'No'}
                    qty={item.qty}
                    />
                )
            })
            return dataArray 
        })

        return result
    }
    
    calculateTotal() {
        const { products, allProducts } = this.state;

        let {total} = this.state;
        let qty = 0;
        let acumulator = 0;
        let usd = 0;

        let result = Object.values(products).map((items) => {
            for(let counter in items) {
                qty = parseInt(items[counter].qty);
                acumulator = acumulator + qty;
                const price  = items[counter].data.price;
                total = total + (price * qty);
            }
            usd = parseInt(total/24.81)
            return (
                <div>
                    <h2 className="subtitle is-2">Total a pagar</h2>
                    <div className="item">
                        <label htmlFor="total-input" className="total-lbl">Total: </label>
                        <input name="total-input" className="input total-input" type="text" disabled={true} value={usd} />
                        <div>
                            <small>Valor en LPS: ${total}</small>
                        </div>
                    </div>
                    <div className="item">
                        <label htmlFor="qty-input" className="total-lbl">Productos: </label>
                        <input name="qty-input" className="input total-input" type="text" disabled={true} value={acumulator} /> 
                    </div>

                 </div>
            )
        });
        
        if(document.getElementById('paypal-button-container')){
            window.paypal.Buttons({
               createOrder: async (data, actions) => {
                   // console.log(...productNames)
                   return await actions.order.create({
                       purchase_units: [
                         {       
                           amount: {
                             currency_code: 'USD',
                             value: usd,
                           },
                         },
                       ],
                   });
               },
               onApprove: (data, actions) => {
                    
                    return actions.order.capture().then((details)  => {
                        this.props.history.push({
                            pathname: '/confirmation',
                            state: {cartProducts: products, everyProduct: allProducts, purchaseDetail: details}
                        })
                    });
               },
               onError: err => {
                   console.log(err);
               }
           }).render('#paypal-button-container');
       }

        return result

    }

    
    render() {

        return (
            <div className="cart-view">
                <h2 className="title container  ">Productos en tu carrito</h2>
                <div className="cart-container">
                    <div className="list-items">
                        {
                            this.state.products == "" ? <h2 className="title">Favor agregar productos a Carrito</h2> :  this.buildProducts()
                        }
                        <small><b>*Al hacer el pago esta aceptando nuestros terminos y condiciones</b></small>
                    </div>
                    <div className="total-section">
                        {
                            this.state.isFetching == false ? this.calculateTotal() : ""
                        }
                        <div id="paypal-button-container">
                        </div>
                    </div>        
                </div>
            </div>
        )
    }

}

export default Cart;