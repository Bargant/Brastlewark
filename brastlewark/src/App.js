import React, { Component }  from 'react';
//import { ListGroup, Bootstrap, Grid, Row, Col } from 'react-bootstrap';
import Gnome from './Components/Gnome'

import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

class App extends Component{

  constructor(props) {
    super(props);
    
    this.state = {
      originalData: [],
      filteredData: []
    };
  }

  componentWillMount() {
    fetch('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          originalData: Object.values(data.Brastlewark),
          filteredData: Object.values(data.Brastlewark)
        });
      })
      .catch(error => this.setState({data: []}));
  }

  handleFilterChange(event) {
    if (event.target.value) {
      var result = this.state.originalData.filter(gnome => {
        return gnome.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0;
      })

      this.setState({ 
        originalData: this.state.originalData,
        filteredData: result
      });
    }
    else {
      this.setState({ 
        originalData: this.state.originalData,
        filteredData: this.state.originalData
      });
    }
  }

  render(){
    const items = this.state.filteredData.map((item, key) =>
      <Gnome key={item.id} data={item} />
    );

    return (
      <div>
        <input type='text' name='filter' onChange={this.handleFilterChange.bind(this)}/>
        <div class="col-sm-6 col-md-4 col-lg-3 mt-4">{items}</div>
      </div>
    );
  }
}


export default App;
