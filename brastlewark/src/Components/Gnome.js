import React, { Component }  from 'react';
import '../App.css';

class Gnome extends Component {
    constructor(props) {
        super(props);
    }
/*
    render() {
        return (
            <tr>
                <td><img src={this.props.data.thumbnail} width='50px'/></td>
                <td>
                    <table><tr>
                        <td>
                        Name: {this.props.data.name}
                        Age: {this.props.data.age}
                        Weight: {this.props.data.weight}
                        Height: {this.props.data.height}
                        Hair color: {this.props.data.hair_color}
                        professions: {this.props.data.name}
                        friends: {this.props.data.name}
                        </td>
                    </tr></table>
                </td>
            </tr>
        );
    }
    */
   
    render() {
        return (
            <div className="card" >
                <img className="card-img-top" src={this.props.data.thumbnail} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.data.name}</h5>
                    <p className="card-text">
                        Age: {this.props.data.age}<br/>
                        Weight: {this.props.data.weight}<br/>
                        Height: {this.props.data.height}<br/>
                        Hair color: {this.props.data.hair_color}<br/>
                        professions: {this.props.data.name}<br/>
                        friends: {this.props.data.name}<br/>
                    </p>
                </div>
            </div>
        );
    }
}

export default Gnome;