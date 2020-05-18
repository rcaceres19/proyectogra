import React, {Component} from 'react';
import Slider from '../../helpers/carousel';
import '../../../css/components/product/product.scss'

class Product extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: JSON.parse(this.props.location.state.data)
        }
      }

    render() {
        const { data } = this.state
        return(
            <div className="product-vw container">
                <div className="product-img">
                    <div className="slider-container">
                        <Slider img={data.images} />
                    </div>
                </div>
                <div className="product-name-rating-info">
                    <div className="product-name">
                        <h3 className="title is-h3">{data.name}</h3>
                    </div>
                    <div className="product-rating">
                        Hello from stars      
                    </div>
                    <div className="product-info">

                    </div>
                </div>
                <div className="product-price-qty-addToCart">
                    <h5 className="title is-5">L. {data.price}</h5>
                </div>
            </div>
        )
    }
}

export default Product;