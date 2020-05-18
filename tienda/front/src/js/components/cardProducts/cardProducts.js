import React, {Component} from "react";
import {withRouter, Route, Redirect, Switch} from 'react-router-dom';


class cardProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props
      // selectedProd: {
      //   data: props,
      //   pagado:false,
      //   qty:"1"
      // }
    }
    // this.getSelectValue = this.getSelectValue.bind(this);
    // this.buildQTY = this.buildQTY.bind(this);
    // this.addToCart = this.addToCart.bind(this);
    this.sendToProduct = this.sendToProduct.bind(this);
  }

  // buildQTY() {
  //   let counter = 1;
  //   const arrayCounter = [];
  //   const {data} = this.state
  //   for(counter; counter <= data.stock; counter++) {
  //     arrayCounter.push(counter);
  //   }   

  //   let result = arrayCounter.map((item) => {
  //     return <option>{item}</option>;
  //   })

  //   return result;

  // }

  // getSelectValue(e) {
  //   const value = e.target.value;
  //   let {data} = this.state;    
    
  //   data = {
  //     data,
  //     qty: value,
  //     pagado: false
  //   }

  //   this.setState({selectedProd: data});
  // } 

  // async addToCart() {
  //   const user = firebase.auth().currentUser;
  //   let userId = '';
  //   let {selectedProd, data} = this.state;
    
  //   if( user ) {
  //       userId = user.uid;
  //   } else {
  //     window.location.href = '/login';
  //   }

  //   data = {
  //     data,
  //     qty: "1",
  //     pagado: false
  //   };

  //   console.log('selectedProduct', selectedProd);

  //   this.setState({selectedProd: data});
    
  //   firebase.database().ref('/users/'+userId+'/cart').push(
  //     selectedProd,
  //     err => console.log(err ? 'error while pushing to DB' : 'succesful push')
  //   );
    
  // }

  sendToProduct() { 
    const { data } = this.state
    
    this.props.history.push({
        pathname: '/product',
        state: {data: JSON.stringify(data)}
    })
  }

  render() {

    const {data} = this.state
    return(
      <div>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src={data.images} alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content producto-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{data.name}</p>
              </div>
            </div>
            <div>
              <p>{data.description}</p>
              <br />
            </div>
             <div className="product-info">
              <div className="product-cost">
                <p>L. {data.price}</p>
              </div>
              {/*<div>
                <label>Stock: </label>
                <p>{data.stock} UD.</p>
              </div>
              <div>
                <label>Categoria: </label>
                <p>{data.category}</p>
              </div>*/}
            </div> 
            <div className="buy-section">
              <label className="buy-lbl">Ver producto</label>
              <hr />
              {/* <div className="qty-section">
                <div className="select">
                  <select name="qty" className="qty-select" onChange={this.getSelectValue}>
                  {
                    this.buildQTY()
                  }  
                  </select>
                </div>
              </div> */}
              {/* <button className="button is-primary add-toCart-btn" onClick={ () => this.addToCart()}>Ver producto</button> */}
              
              <button className="button is-primary add-toCart-btn" onClick={ () => this.sendToProduct()}>Ver producto</button>
            </div>
          </div>
        </div>
      </div>
    ) 
  }
};

export default withRouter(cardProduct);
