import React, {Component} from 'react';
import firebase from '../../../firebase'
import Slider from "react-slick";
import CardProduct from '../cardProducts/cardProducts'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../css/components/home/home.scss"

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
        this.getSelectValue = this.getSelectValue.bind(this);
    }

    componentDidMount() {
        firebase.database().ref('products/').once('value', (snapshot) => {
            this.setState({ products: [snapshot.val()] })
        })
    }

    getSelectValue(e) {
        const value = e.target.value;

        console.log(value)
    }

    filterItems() {
        const {products} = this.state;

        let resultArray = products.map((items, index) => {
           let result = Object.values(items).map((item, index) => {
                let lastResult =  Object.values(item).map((items,index) => {
                    if(items.featured == true) {
                        return(
                            <div className="card-container prod-container">
                                <CardProduct 
                                    name={items.name} 
                                    category={items.cat} 
                                    description={items.desc}
                                    outStock={items.outStock}
                                    price={items.price} 
                                    stock={items.stock}
                                    images={items.images[0]}
                                />
                            </div>
                        )
                    }   
                })
                return lastResult
            })
            return result;
        })
        return resultArray;
    }

    render() {
        const settings = {
            accessibility: false,
            arrows: true,
            autoplay: true,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };

        return(
            <div className="hello-view">
                <div className="container">
                    <div className="slider-container">
                        <Slider {...settings}>
                            <div className="carousel-item">
                                <div className="image-item adidas"/>
                            </div>
                            <div className="carousel-item">
                                <div className="image-item camisa-hombre" />
                            </div>
                            <div className="carousel-item">
                                <div className="image-item pantalon-mujer" />
                            </div>
                            <div className="carousel-item">
                                <div className="image-item iphone-11"/>
                            </div>
                            <div className="carousel-item">
                                <div className="image-item samsung-phone" />
                            </div>
                            <div className="carousel-item">
                                <div className="image-item beats"/>
                            </div>
                        </Slider>
                    </div>
                    <div className="featured-container">
                        <h2 className="title is-2">Promociones</h2>
                        <small>Aprovecha estas ofertas de parte de City Queen Shop</small>
                        <hr></hr>
                        {
                            this.filterItems()
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Home;