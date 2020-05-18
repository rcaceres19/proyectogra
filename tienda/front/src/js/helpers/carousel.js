import React, { Component } from "react";
import Slider from "react-slick";
import '../../css/components/carousel/carousel.scss'

export default class SimpleSlider extends Component {
  
    constructor(props) {
        super(props)

        this.state = {
            images: props.img
        }

        this.handleImg = this.handleImg.bind(this)
    }
  
    handleImg() {
        const { images } = this.state;

        let viewImg = images.map((item, key) => {
            return (
                <div className="slider-img-container">
                    <img className="slider-img" src={item} key={item} />
                </div>
            )
        })

        return viewImg
    }
  
    render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      lazyLoad: true,
      className: 'slides'
    };

    return (
      <div className="carousel-vw">
        <Slider {...settings}>
          {
              this.handleImg()
          }
        </Slider>
      </div>
    );
  }
}