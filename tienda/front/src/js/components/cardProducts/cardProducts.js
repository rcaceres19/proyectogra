import React from "react";
import firebase from '../../../firebase'

const cardProduct = (props) => {

  const addToCart = () => {
    const userId = firebase.auth().currentUser.uid;
    const product = props

    firebase.database().ref('/users/'+userId+'/cart').push(
      product,
      err => console.log(err ? 'error while pushing to DB' : 'succesful push')
    )
  }

  return (
    <div>
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={props.images} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content producto-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{props.name}</p>
            </div>
          </div>
          <div>
            <p>{props.description}</p>
            <br />
          </div>
          <div className="product-info">
            <hr />
            <div>
              <label>Precio: </label>
              <p>L. {props.price}</p>
            </div>
            <div>
              <label>Stock: </label>
              <p>{props.stock} UD.</p>
            </div>
            <div>
              <label>Categoria: </label>
              <p>{props.category}</p>
            </div>
          </div>
          
          <button className="button is-primary add-toCart-btn" onClick={addToCart}>Agregar a carrito</button>

        </div>
      </div>
    </div>
  );
};

export default cardProduct;
