import React from 'react'

import '../../css/components/footer/footer.scss';
import info from '../../assets/images/technology.svg';
import location from '../../assets/images/gps.svg';
import phone from '../../assets/images/phone.svg';

 const Footer = () => {
     const footerIconWidth = 30;
    return (
        <footer class="footer">
            <div class="content has-text-centered">
                <div className="row">
                    <div className="columns">
                        <div className="column">
                            <img src={phone} width={footerIconWidth} />
                            <h4 className="title is-4 has-text-white">Tel&eacute;fonos</h4>
                            <ul>
                                <li><a className="has-text-white" href="tel:+504 31200032">+(504)31200032</a></li>
                                <li><label htmlFor=""><b>Oficinas:</b></label></li>
                                <li><a className="has-text-white" href="tel:+504 31200032">+(504)31200032</a></li>
                            </ul>
                        </div>
                        <div className="column">
                            <img src={location} width={footerIconWidth} />
                            <h4 className="title is-4 has-text-white">Direcci&oacute;n</h4>
                            <p>San Pedro Sula: Barrio San Fernando, <br />1ra calle entre 11-12 avenida N.E. Autopista hacia el Aeropuerto Internacional Ramon Villeda Morales.</p>
                        </div>
                        <div className="column">
                            <img src={info} width={footerIconWidth} />
                            <h4 className="title is-4 has-text-white">Informaci&oacute;n</h4>
                            <ul>
                                <li><a className="has-text-white" href="">Nosotros</a></li>
                                <li><a className="has-text-white" href="">Terminos y Condiciones</a></li>
                                <li><a className="has-text-white" href="">Preguntas Frecuentes </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="columns is-centered">
                        <div className="column is-three-quarters">
                            <hr/>
                            <p>Hecho por Reina Caceres💖</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;
