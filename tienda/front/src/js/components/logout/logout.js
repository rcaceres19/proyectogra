import React from 'react';
import firebase from 'firebase';

const logOutUser = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
};

const LogOut = (props) => {
    if( props.auth){
        return (
            <a className="navbar-item is-link is-small" onClick={ (e) => logOutUser()}>
                <span className="icon"><i className="fa fa-sign-out" /></span> Cerrar Sesion
            </a>
         );
    } else {
        return null;
    }

};
export default LogOut;