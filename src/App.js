import React, { Component } from 'react';
import DaylyImage from './DaylyImage/DaylyImage';
import CurrentTime from './CurrentTime/CurrentTime';
import Greeting from './Greeting/Greeting';

// <CurrentTime/>
// <MainFocus/>
// <TodoList/>
// <Weather/>
// <Quote/>

import './App.css';

class App extends Component {
  render() {
    return (
      <DaylyImage>
          <div className='app__hello-block'>
              <CurrentTime/>
              <Greeting/>
          </div>
      </DaylyImage>
    );
  }
}

export default App;
