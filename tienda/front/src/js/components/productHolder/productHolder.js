import React from "react";
import firebase from '../../../firebase';

const ProductHolder = (props) => {

    const { id, name, price, description, featured = 'No', qty , images} = props.product;

    // const eraseInfo = async(e) => {
    //     console.log('hello from erase')
    //     let propss  = props;
    //     let propsId = propss.id;
    //     let userId = firebase.auth().currentUser.uid;
    //     let cartItems = [];
    //     let element = e.target.parentNode.parentNode.parentNode.parentNode;
        
        
    //     await firebase.database().ref('/users/'+userId+'/cart').once('value', snapshot => {
    //         cartItems.push(snapshot.val());
    //     })
    
    //     cartItems.map(items => {
    //         for(let counter in items) {
    //             if(items[counter].data.id == propsId){
    //                 delete items[counter]
    //             }
    //             firebase.database().ref('/users/'+userId+'/cart').set(
    //                 items
    //             )
    //         }
    //     })
        
    //     return element.parentNode.removeChild(element);   
    // }

    // const eraseNode = (e) => { 
    //    let element = e.target.parentNode.parentNode;
    //     return element.parentNode.removeChild(element);


    //     // element.remove();
    // }
    
    return(
        <div className="item-holder">
            <div className="item">
                <div className="item-pic">
                    <img src={images} />
                </div>
                <div className="item-info holder">
                    <div className="item-basic-info">
                        <p><b>Nombre de producto:</b> {name}</p>
                        <p><b>Precio: </b>{price} L.</p>
                        <p><b>Descripcion: </b>{description}</p>
                        <p><b>Promocion: </b>{featured}</p>
                        <p><b>Cantidad a comprar: </b>{qty}</p>
                    </div>
                </div>
                <div className="item-actions">
                    <button className="item-button button is-danger">
                        <span className="icon is-small"  onClick={ () => props.remove(id)}>
                            <i className="fa fa-trash" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductHolder