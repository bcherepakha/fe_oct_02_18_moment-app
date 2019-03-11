import React from 'react';
import PropTypes from 'prop-types';

import './AddPointsForm.css';

export default class AddPointsForm extends React.Component {
    static propTypes = {
        submitHandler: PropTypes.func.isRequired
    }

    state = {
        x: '',
        y: ''
    }

    changeInput = e => {
        const {name, value} = e.target;

        this.setState({
            [name]: value
        });
    }

    submitForm = e => {
        e.preventDefault();

        const {x, y} = this.state;

        this.setState({
            x: '',
            y: ''
        }, () => this.props.submitHandler({x, y}));
    }

    render() {
        const {x, y} = this.state;

        return <form className='add-point' onSubmit={this.submitForm}>
            <label className='add-point__row'>
                <span className='add-point__row-label'>X:</span>
                <input
                    className='add-point__row-input'
                    type="text"
                    name="x"
                    value={x}
                    onChange={this.changeInput}/>
            </label>
            <label className='add-point__row'>
                <span className='add-point__row-label'>Y:</span>
                <input
                    className='add-point__row-input'
                    type="text"
                    name="y"
                    value={y}
                    onChange={this.changeInput}/>
            </label>
            <div className='add-point__controls'>
                <button type='submit'>Add</button>
            </div>
        </form>;
    }
}
