import React from 'react';

import './CurrentTime.css';

export default class CurrentTime extends React.Component {
    static defaultProps = {
        updateTime: 10000
    }

    state = {
        currentTime: new Date()
    }

    componentDidMount() {
        this.nextTick();
    }

    nextTick() {
        console.log('nextTick');
        setTimeout(() => {
            this.setState({
                currentTime: new Date()
            });

            this.nextTick();
        }, this.props.updateTime);
    }

    render() {
        const {mixCls} = this.props,
            {currentTime} = this.state,
            hh = currentTime.getHours().toString().padStart(2, '0'),
            mm = currentTime.getMinutes().toString().padStart(2, '0');

        return <time
            className={['current-time', mixCls].filter(Boolean).join(' ')}
            dateTime={currentTime.toISOString()}>
            {hh}:{mm}
        </time>;
    }
}
