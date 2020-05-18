import React, {Component} from 'react';
import firebase from '../../../firebase'
import Card from '../../components/card/card'
import '../../../css/components/card/card.scss'

class Companies extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            companies: []
        }
    }

    componentDidMount() {
        firebase.database().ref('companies/').once('value', (snapshot) => {
            this.setState({companies: [...this.state.companies, ...[snapshot.val()] ]})    
              
        })
    }

    buildCards() {
        const {companies} = this.state
        let result = companies.map((items) => {
            let dataArray = Object.values(items).map((item, index) => {
                return (
                    <div className="card-containerCompany">
                        <Card key={index} company={item.company} email={item.email} tel={item.tel} desc={item.desc} logo={item.logo} />
                    </div>
                )
            })
            
            return dataArray;
            
        })
        
        return result;
    }

    render() {
    
        return(
            <div className="container">
            {
               this.buildCards()
            }
            </div>
        )
    }

}
export default Companies;