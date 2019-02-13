import React from 'react';

import './DaylyImage.css';

export default class DaylyImage extends React.Component {
    state = {
        currentImage: window.localStorage.currentImage || 'dayly',
        featured: 'nature'
    }

    changeInput = e => this.setState({
        [e.target.name]: e.target.value
    })

    render() {
        const {children} = this.props,
            {currentImage, featured} = this.state,
            imgSrc = currentImage === 'dayly'
                ? 'https://source.unsplash.com/daily'
                : `https://source.unsplash.com/1600x900/?${featured}`;

        return (
            <div style={{
                        backgroundImage: `url(${imgSrc})`
                }}
                className='dayly-image'>

                {children}

                <form className='dayly-image__settings'>
                    <div>
                        <label>
                            <input
                                onChange={this.changeInput}
                                type='radio'
                                name='currentImage'
                                value='dayly'
                                checked={currentImage === 'dayly'}/> Dayly image
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                onChange={this.changeInput}
                                type='radio'
                                name='currentImage'
                                value='random'
                                checked={currentImage === 'random'}/> Random image
                        </label>
                        {currentImage === 'random' &&
                            <input
                                onChange={this.changeInput}
                                name='featured'
                                value={featured}
                                type='text'/>}
                    </div>
                </form>
            </div>
        );
    }
}
