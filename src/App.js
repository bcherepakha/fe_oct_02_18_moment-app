import React, { Component } from 'react';
import DaylyImage from './DaylyImage/DaylyImage';

import Graph from './Graph/Graph';

import './App.css';

class App extends Component {
  render() {
    return (
      <DaylyImage>
          <Graph mixCls='app__graph'/>
      </DaylyImage>
    );
  }
}

export default App;
