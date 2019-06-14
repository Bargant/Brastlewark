import React, { Component }  from 'react';
import InputRange from 'react-input-range';
import ReactPaginate from 'react-paginate';
//import { ListGroup, Bootstrap, Grid, Row, Col } from 'react-bootstrap';
import Gnome from './Components/Gnome'

import 'bootstrap/dist/css/bootstrap.css';
import "react-input-range/lib/css/index.css"

import './App.css';

const SHOWFILTERTXT = 'Show advanced filters';
const HIDEFILTERTXT = 'Hide advanced filters';
const SERVICEURL = 'https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json';
const ITEMSPERPAGE = 10;

class App extends Component{

  constructor(props) {
    super(props);
    
    this.state = {
      originalData: [],
      filteredData: [],
      filterText: '',
      ageRange: { min: 0, max: 400 },
      heightRange: { min: 0, max: 130 },
      weightRange: { min: 0, max: 50 },
      filterName: true,
      filterHair: false,
      filterProfession: false,
      filterFriends: false,
      showFilters: false,
      showFilterText: SHOWFILTERTXT,
      pageCount: 0,
      offset: 0
    };
  }

  componentWillMount() {
    fetch(SERVICEURL)
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          originalData: Object.values(data.Brastlewark),
          filteredData: Object.values(data.Brastlewark).slice(this.state.offset, this.state.offset + ITEMSPERPAGE),
          pageCount: Object.values(data.Brastlewark).length / ITEMSPERPAGE,
        });
      });
  }

  handleFilterChange(event) {
    this.setState({ 
      filterText: event.target.value.toLowerCase()
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value.toLowerCase();
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFilterClick(event) {
    this.updateList(0);
  }

  updateList(offset) {
    var result = this.state.originalData.filter(gnome => {
      return (
           (gnome.age >= this.state.ageRange.min && gnome.age <= this.state.ageRange.max)
        && (gnome.height >= this.state.heightRange.min && gnome.height <= this.state.heightRange.max)
        && (gnome.weight >= this.state.weightRange.min && gnome.weight <= this.state.weightRange.max)
        && (!this.state.filterText 
          || (this.state.filterName && gnome.name.toLowerCase().indexOf(this.state.filterText) >= 0)
          || (this.state.filterHair && gnome.hair_color.toLowerCase().indexOf(this.state.filterText) >= 0)
          || (this.state.filterProfession && gnome.professions.some(r=> r.toLowerCase().indexOf(this.state.filterText) >= 0))
          || (this.state.filterFriends && gnome.friends.some(r=> r.toLowerCase().indexOf(this.state.filterText) >= 0))
        )
      );
    })

    this.setState({ 
      filteredData: result.slice(offset, offset + ITEMSPERPAGE),
      pageCount: result.length / ITEMSPERPAGE,
      offset: offset
    });
  }

  handleClickShowFilters() {
    if (this.state.showFilters) {
      this.setState({ 
        showFilters: false,
        showFilterText: SHOWFILTERTXT
      });
    }
    else {
      this.setState({ 
        showFilters: true,
        showFilterText: HIDEFILTERTXT
      });
    }
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * ITEMSPERPAGE);

    this.updateList(offset);
  };

  searchKeyPressed(event){
    if (event.key === "Enter") {
      this.handleFilterClick(event);
    }
  }

  render(){
    const items = this.state.filteredData.map((item, key) =>
      <Gnome key={item.id} data={item} />
    );

    return (
      <div className='global-container'>
        <h1>Brastlewark census</h1>
        <input type='text' name='filterText' className='form-control filter-text' placeholder="Search"
        onChange={this.handleInputChange.bind(this)} onKeyPress={this.searchKeyPressed.bind(this)}/>
        
        <div className='show-filters btn btn-link text-decoration-none' onClick={this.handleClickShowFilters.bind(this)}>{this.state.showFilterText}</div>
        {this.state.showFilters && <div className='filter-container'>
          
          <h5 className='filter-header'>Search by:</h5>

          <div className="form-check">
            <input className="form-check-input" name='filterName' type="checkbox" 
              checked={this.state.filterName} onChange={this.handleInputChange.bind(this)} id="defaultCheck1"/>
            <label className="form-check-label" for="defaultCheck1">
              Name
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" name='filterHair' type="checkbox" 
              checked={this.state.filterHair} onChange={this.handleInputChange.bind(this)} id="defaultCheck2"/>
            <label className="form-check-label" for="defaultCheck2">
              Hair Color
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" name='filterProfession' type="checkbox" 
              checked={this.state.filterProfession} onChange={this.handleInputChange.bind(this)} id="defaultCheck3"/>
            <label className="form-check-label" for="defaultCheck3">
              Profession
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" name='filterFriends' type="checkbox" 
              checked={this.state.filterFriends} onChange={this.handleInputChange.bind(this)} id="defaultCheck4"/>
            <label className="form-check-label" for="defaultCheck4">
              Friends
            </label>
          </div>

          <div className='filter-range'>
            <label>Age</label>
            <InputRange
              maxValue={400}
              minValue={0}
              value={this.state.ageRange}
              onChange={value => this.setState({ ageRange: value })} />
          </div>
          <div className='filter-range'>
            <label>Height</label>
            <InputRange
              className='filter-range'
              maxValue={130}
              minValue={0}
              value={this.state.heightRange}
              onChange={value => this.setState({ heightRange: value })} />
          </div>
          <div className='filter-range'>  
            <label>Weight</label>
            <InputRange
              className='filter-range'
              maxValue={50}
              minValue={0}
              value={this.state.weightRange}
              onChange={value => this.setState({ weightRange: value })} />
          </div>
        </div>}
        <button type="button" className="btn btn-primary filter-button" onClick={this.handleFilterClick.bind(this)}>Search</button>
        
        {this.state.filteredData.length>0 &&
        <div className='items-container' >{items}</div>
         }
         {this.state.filteredData.length==0 &&
          <div className='items-container' >No results found</div>
         }
        <ReactPaginate
          className='paginator'
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}


export default App;
