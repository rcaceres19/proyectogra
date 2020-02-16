import React from 'react';
import {render} from 'react-dom';
import AdminForm from './js/components/form/adminForm';


render ( 
    <AdminForm />, document.getElementById('root')
);

module.hot.accept();
