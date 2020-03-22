import React, {Component} from 'react';
import firebase from '../../../firebase'
import CardProduct from '../cardProducts/cardProducts';
import '../../../css/components/card/card.scss'


class Products extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            products: []
        }
        this.buildProducts = this.buildProducts.bind(this);
    }

    componentDidMount() {
    firebase.database().ref('products/').once('value', (snapshot) => {
            this.setState({ products: [snapshot.val()] })
        })
    }

    
    buildProducts() {
        const {products} = this.state;
        
        let result  = products.map((items) => {
            let dataArray = Object.values(items).map((item,index) => {
                for(let data in item){
                    return(
                            <div className="card-container prod-container">
                            <CardProduct 
                                name={item[data].name} 
                                category={item[data].cat} 
                                description={item[data].desc}
                                outStock={item[data].outStock}
                                price={item[data].price} 
                                stock={item[data].stock}
                                images={item[data].images[0]}
                            />
                            </div>     
                    )
                }
            })
            
            return dataArray;
        })

        return result;
    }
    

    render() {
        return(
            <div className="container is-fluid">
                {
                    this.buildProducts()
                }
            </div>
        )
    }
}

export default Products;

