import React, { Component }  from 'react';
import '../App.css';

class Gnome extends Component {
    constructor(props) {
        super(props);
    }
   
    render() {
        const professions = this.props.data.professions.join(", ");
        const friends = this.props.data.friends.join(", ");
        const weight = Math.round(this.props.data.weight * 10) / 10;
        const height = Math.round(this.props.data.height);
        
       return (
            <div className="card flex-row flex-wrap">
                <div className="card-header border-0">
                    <img src={this.props.data.thumbnail} alt=""  />
                </div>
                <div className="card-block px-2">
                    <h4 className="card-title">{this.props.data.name}</h4>
                    <p className="card-text">
                        <b>Age:</b> {this.props.data.age}<br/>
                        <b>Weight:</b> {weight} kg<br/>
                        <b>Height:</b> {height} cm<br/>
                        <b>Hair color:</b> {this.props.data.hair_color}<br/>
                        <b>Professions:</b> {professions}<br/>
                        <b>Friends:</b> {friends}<br/>
                    </p>
                </div>
                <div className="w-100"></div>
            </div>
       );
    }
}

export default Gnome;