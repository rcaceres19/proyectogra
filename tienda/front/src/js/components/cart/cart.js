import React, {Component} from 'react';
import firebase from '../../../firebase';
import ProductHolder from '../productHolder/productHolder';


import '../../../css/components/productHolder/productHolder.scss';
import '../../../css/components/cart/cart.scss'

class Cart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            paidFor: false,
            loaded: false,
            error: '',
            isFetching: true,
            totalProds: 0,
            originData: [],
            products: []
        }

        this.calculateTotal = this.calculateTotal.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
    }

    async componentDidMount() {
        this.fetchProducts();
    }

    async fetchProducts() {
        const userId = firebase.auth().currentUser.uid;
        const refDB = `/users/${userId}/cart/`;

        try {
            await firebase.database().ref(refDB).once('value', (snapshot) => {
                if(snapshot.exists()) {
                    // Format Products the correct way
                    const originData = snapshot.val();
                    const products = Object.values(snapshot.val()).map( item => {
                        return {
                            category: item['data'].category,
                            description: item['data'].description,
                            id: item['data'].id,
                            images: item['data'].images,
                            name: item['data'].name,
                            outStock: item['data'].outStock,
                            price: parseInt(item['data'].price),
                            stock: item['data'].stock,
                            pagado: item.pagado,
                            qty: parseInt(item.qty),
                        };
                    });
    
                    this.setState({ products, originData });
                }
            });

            this.calculateTotal();
        } catch(e) {
            console.log(e.message);
        }
    }

    async removeProduct(id){
        let { originData, products } = this.state;
        const dataKeys = Object.keys(originData);
        const userId = firebase.auth().currentUser.uid;
        const refDB = `/users/${userId}/cart/`;
        let newCart= {};

        try {
            // Delete from current List
            products = products.filter( product => product.id !== id);

            // Delete From original Data
            dataKeys.map( key => {
                if (originData[key].data.id !== id) {
                    return newCart[key] = originData[key];
                }
            });
            
            // Save updated cart to firebase
            await firebase.database().ref(refDB).set(newCart);

            this.setState({ products, originData: newCart }, () => this.calculateTotal());

        } catch (e) {
            console.log(e.message)
        }

    }

    calculateTotal() {
        const { products } = this.state;

        let total = 0;
        let acumulator = 0;
        let usd = 0;

        products.forEach(product => {
            total = total + (product.qty * product.price);
            acumulator = acumulator + product.qty;
        });

        usd = parseInt(total/24.81);

        this.setState({total, usd, totalProds:acumulator});

        // ///////////////////////////////////////////////////////////////
        // ///////////////////////////////////////////////////////////////
        // 
        // Pagar Deberia ser el Ultimo Paso!! No DEBERIA IR EN ESTA PAGINA
        // 
        // ///////////////////////////////////////////////////////////////
        // ///////////////////////////////////////////////////////////////

        // if(document.getElementById('paypal-button-container')){
        //     window.paypal.Buttons({
        //        createOrder: async (data, actions) => {
        //            // console.log(...productNames)
        //            return await actions.order.create({
        //                purchase_units: [
        //                  {       
        //                    amount: {
        //                      currency_code: 'USD',
        //                      value: usd,
        //                    },
        //                  },
        //                ],
        //            });
        //        },
        //        onApprove: (data, actions) => {
                    
        //             return actions.order.capture().then((details)  => {
        //                 this.props.history.push({
        //                     pathname: '/confirmation',
        //                     state: {cartProducts: products, everyProduct: allProducts, purchaseDetail: details}
        //                 })
        //             });
        //        },
        //        onError: err => {
        //            console.log(err);
        //        }
        //    }).render('#paypal-button-container');
        // }
    }

    render() {

        return (
            <div className="cart-view">
                <h2 className="title container  ">Productos en tu carrito</h2>
                <div className="cart-container">
                    <div className="list-items">
                        {this.state.products.length > 0 &&  this.state.products.map( (productItem, index) => <ProductHolder key={`cartItem-${index}`} product={productItem} remove={this.removeProduct}/>)}
                        {this.state.products.length === 0 && <h2>No hay productos</h2>}
                        <small><b>*Al hacer el pago esta aceptando nuestros terminos y condiciones</b></small>
                    </div>
                    <div className="total-section">
                        {
                        this.state.products.length > 0 && <div>
                            <h2 className="subtitle is-2">Total a pagar</h2>
                            <div className="item">
                                <label htmlFor="total-input" className="total-lbl">Total: </label>
                                <input name="total-input" className="input total-input" type="text" disabled={true} value={this.state.usd} />
                                <div>
                                    <small>Valor en LPS: ${this.state.total}</small>
                                </div>
                            </div>
                            <div className="item">
                                <label htmlFor="qty-input" className="total-lbl">Productos: </label>
                                <input name="qty-input" className="input total-input" type="text" disabled={true} value={this.state.totalProds} /> 
                            </div>
                            <div id="paypal-button-container" />
                        </div>}
                    </div>        
                </div>
            </div>
        )
    }

}

export default Cart;