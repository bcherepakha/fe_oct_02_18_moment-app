import React from 'react';

import SettingsWidget from './SettingsWidget/SettingsWidget';

import './DaylyImage.css';

export default class DaylyImage extends React.Component {
    state = {
        currentKeywords: ''
    }

    changeKeywords = e => {
        const {value} = e.target;

        this.setState({
            currentKeywords: value.trim()
        });
    }

    render() {
        const {children} = this.props,
            {currentKeywords} = this.state,
            imgSrc = `https://source.unsplash.com/daily?${encodeURIComponent(currentKeywords)}`;

        return (
            <div style={{
                        backgroundImage: `url(${imgSrc})`
                }}
                className='dayly-image'>

                {children}

                <SettingsWidget
                    mixCls='dayly-image__settings'
                    currentKeywords={currentKeywords}
                    changeHandler={this.changeKeywords}/>
            </div>
        );
    }
}
