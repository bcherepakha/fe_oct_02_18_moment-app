import React from 'react';

import './Greeting.css';

export default class Greeting extends React.Component {
    state = {
        name: window.localStorage.getItem('name'),
        temporaryName: '',
        showSettings: false,
        editName: false,
        showMantra: false
    }

    changeName = e => this.setState({
        temporaryName: e.target.value
    })

    saveName = e => {
        e.preventDefault();

        this.setState(prevState => ({
            temporaryName: '',
            name: prevState.temporaryName || prevState.name,
            editName: false
        }), () => {
            window.localStorage.setItem('name', this.state.name)
        });
    }

    toggleSettings = () => this.setState(({showSettings}) => ({
        showSettings: !showSettings
    }))

    startEditName = () => this.setState(({name}) => ({
        temporaryName: name,
        editName: true,
        showSettings: false
    }));

    toggleMantra = () => this.setState(({showMantra}) => ({
        showMantra: !showMantra,
        showSettings: false
    }))

    render() {
        const {
                name = '',
                temporaryName = '',
                showSettings,
                editName,
                showMantra
            } = this.state,
            title= showMantra
                ? `${name}. You can!`
                : `Hello, ${name}`;

        return <div className='greeting'>
            <div className='greeting__name'>
                {!editName && name
                    ? title
                    : <form className='greeting__set-name' onSubmit={this.saveName}>
                        <label>
                            {`What is your name: `}
                            <input
                                className='greeting__input-name'
                                type='text'
                                value={temporaryName}
                                onChange={this.changeName}/>
                            {`?`}
                        </label>
                        <button className='greeting__save-name' type='submit'>Save</button>
                    </form>}
            </div>
            {name &&
                <div className='greeting__settings'>
                    <button
                        className='greeting__settings-btn'
                        onClick={this.toggleSettings}>
                        ...
                    </button>
                    {showSettings &&
                        <ul className='greeting__settings-list'>
                            <li className='greeting__settings-list-item'>
                                <button
                                    className='greeting__action'
                                    onClick={this.toggleMantra}>
                                    {showMantra
                                        ? `Hide mantra`
                                        : `Show mantra`}
                                </button>
                            </li>
                            <li className='greeting__settings-list-item'>
                                <button
                                    className='greeting__action'
                                    onClick={this.startEditName}>
                                    Edit name
                                </button>
                            </li>
                        </ul>}
                </div>}
        </div>;
    }
}
