import React from 'react';
import '../../../css/components/card/card.scss'

const Card = (props) => {
  return (
    <div>
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={props.logo} alt="Placeholder image" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{props.company}</p>
              <button className="button is-primary">Visitar tienda</button>
            </div>
          </div>
          <div>
            {props.desc}
            <br />
          </div>
          <div class="contact-info">
            <hr />
            <div>
              <label>Tel: </label><a href={`tel:+${props.tel}`} >{props.tel}</a>
            </div>
            <div>
              <label>Email: </label><a href={`mailto:${props.email}`}>{props.email}</a>
            </div>

          </div>
        </div>
      </div>
    </div> 
 );
};

export default Card;