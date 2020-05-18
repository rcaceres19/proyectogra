import React, {Component} from 'react';
import firebase from '../../../firebase'
import confirmationIMG from '../../../assets/images/confirmation/checkOrder.png'
import '../../../css/components/confirmation/confirmation.scss'

class Confirmation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartProducts: this.props.location.state.cartProducts,
            purchaseDetails: this.props.location.state.purchaseDetail,
            boughtHistory: [],
            doneRender: false
        }
    }
    
    // handleCopy = () => {

    //     let { cartProducts } = this.state
    //     const userId = firebase.auth().currentUser.uid;

    //     Object.values(cartProducts).map((items) => {
    //         for(let counter in items) {
    //             items[counter].pagado = true
    //         }
    //     })
        
    //     firebase.database().ref('/users/'+userId+'/boughtHistory/').push(
    //         cartProducts,
    //         err => console.log(err ? 'error while pushings to DB' : 'succesful push')
    //     )

    // }

    // handleErase = () => {
    //     const userId = firebase.auth().currentUser.uid;
    //     firebase.database().ref('/users/'+userId+'/cart/').remove()
    // }

    // handleUpdate = () => {
    //     let { everyProduct, cartProducts } = this.state;
    //     let updateWho = [];
    //     let everyProductCopy = [];
    //     let cartProductsCopy = [];
    //     let userKey = []
        
    //     Object.values(everyProduct).map((productItems) => {
    //         userKey = Object.keys(productItems);
    //         Object.values(productItems).map((items) => {
    //             Object.values(cartProducts).map((cartItems) => {
    //                 for(let counter in items){ 
    //                     for(let counterr in cartItems) {
    //                         console.log(items[counter].id == cartItems[counterr].data.id);
    //                         if(items[counter].id == cartItems[counterr].data.id) {
    //                             items[counter].stock = items[counter].stock - cartItems[counterr].qty;
    //                         }
    //                     }
    //                 }
    //             })
    //         })
    //         firebase.database().ref('products/').update(
    //             productItems
    //         )
    //     });
        
    // }

    render() {
        const { purchaseDetails, cartProducts } = this.state;
        console.log(purchaseDetails)
        console.log(cartProducts)
        return(
            <div className="confirmation-vw container">
            Hello from confirmation
                {/* <div className="confirmation-div">
                    <img src={confirmationIMG} className="confirmationIMG" />
                    <h2 className="title is-2">Felicidades {purchaseDetails.payer.name.given_name} {purchaseDetails.payer.name.surname}</h2>
                    <div className="confirmation-id">
                        <h4 className="title is-4">Tu codigo de compra es: <small className="purchase-id">{purchaseDetails.purchase_units[0].payments.captures[0].id}</small></h4>
                        
                    </div>
                </div>
                <div className="bought-details">
                    <h4 className="title is-4">Total de compra: <label className="purchase-id">LPS. {parseInt(purchaseDetails.purchase_units[0].amount.value * 24.81)}</label></h4>
                </div>
                <div className="text-confirmation">
                    <p>Te recordamos revisar tu cuenta de paypal, si tienes algun reclamo no dudes en contactarnos al numero 
                        <a href="tel:+50489064735">+504 8906-4735</a>
                    </p>
                    <p className="warning-text">
                        NOTA*: FAVOR EVITAR RECARGAR LA PAGINA.
                    </p>
                </div>
                {
                    this.handleCopy(),
                    this.handleUpdate(),
                    this.handleErase()
                } */}
            </div>

           
        )
    }

}

export default Confirmation;
