import React, {Component} from 'react';
import firebase from '../../../firebase'
import CardProduct from '../cardProducts/cardProducts';
import '../../../css/components/card/card.scss'


class Products extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            products: [],
            WindowSize: 0
        }
        this.buildProducts = this.buildProducts.bind(this);
        this.getWindowWidth = this.getWindowWidth.bind(this);
    }

    async componentDidMount() {
        await firebase.database().ref('products/').once('value', (snapshot) => {
            this.setState({ products: [snapshot.val()] })
        })
        window.addEventListener('resize', this.getWindowWidth());
    }
    
    buildProducts() {
        const {products} = this.state;
        
        let result  = products.map((items) => {
            let dataArray = Object.values(items).map((item,index) => {
                let lastResult =  Object.values(item).map((items,index) => {
                    return(
                        <div className="card-container prod-container">
                            <CardProduct 
                                name={items.name}
                                id={items.id}
                                category={items.cat} 
                                description={items.desc}
                                outStock={items.outStock}
                                price={items.price} 
                                stock={items.stock}
                                images={items.images}
                            />
                        </div>
                    ) 
                })
                return lastResult
            })
            
            return dataArray;
        })

        return result;
    }

    getWindowWidth(WindowSize , event) {
        this.setState({ WindowSize: window.innerWidth })    
    }
    

    render() {

        const {WindowSize} = this.state;
        return(
            <div className="container is-fluid">
                { WindowSize > 768 ?
                <div className="sidebar-filter">
                    <div className="filter-item">
                        <ul>
                            <li value="">Electrodomesticos</li>
                        </ul>
                    </div>
                </div>
                :
                ""
                }
                <div className="cards-component">
                    {
                        this.buildProducts()
                    }
                </div>
            </div>
        )
    }
}

export default Products;

