import React from 'react'

import '../../css/components/footer/footer.scss';

 const Footer = () => {
    return (
        <div className="footer-view">
            <div className="container is-fluid links-container">
                <div className="contactInfo item-container">
                    <div className="detail">
                        <i className="fa fa-phone" />
                        <label> Telefonos</label>
                        <div>
                            <a>+(504)31200032</a>
                            <label>Oficinas</label>
                            <a>+(504)22054812</a>
                        </div>
                    </div>
                </div>
                <div className="location item-container">
                    <div className="detail">
                        <i className="fa fa-home" />
                        <label> Direccion</label>
                        <div>
                            <p>San Pedro Sula: Barrio San Fernando, <br />1ra calle entre 11-12 avenida N.E. Autopista hacia el Aeropuerto Internacional Ramon Villeda Morales.</p>
                        </div>
                    </div>
                </div>
                <div className="linkInterest item-container">
                    <div className="detail links">
                        <div>
                            <i className="fa fa-info-circle" />
                            <label> Informacion</label>
                            <div>
                                <a>Acerca de nosotros</a>
                                <a>Terminos y condiciones</a>
                                <a>FAQS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container footer-ending">
                <p><b>Hecho por Reina Caceres💖</b></p>
            </div>
        </div>
    )
}


export default Footer;