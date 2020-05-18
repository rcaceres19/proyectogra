import React, {Component} from 'react'
import firebase from '../firebase';
import Bar from './header/bar/bar';
import '../css/mystyles.scss';
import Footer from './footer/footer';
import Sidebar from './components/sidebar/sidebar';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((authenticated) => {
          authenticated
            ? this.setState(() => ({
                authenticated: true,
              }))
            : this.setState(() => ({
                authenticated: false,
              }));
        });
    }

    render() {
        return(
            <div className="app-view">
                
                <Bar authenticated={this.state.authenticated} />
                {/* <div id="menu-sidebar">
                    <Sidebar />
                </div> */}
                <Footer />
            </div>
        )
    }
}

export default App;