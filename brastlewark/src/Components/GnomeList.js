import React, { Component }  from 'react';
import '../App.css';

class GnomeList extends Component {
    constructor(props) {
        super(props);
        
        this.state = { name: '' };
    }

    componentDidMount() {
        this.setState({ name: this.props.name });
    }

    render() {
        return (
            <div>{this.state.name}</div>
        );
    }
}

export default GnomeList;