import React from 'react';
import Chat from './Chat';
import Home from './Home';

import {
  Router,
  Scene,
} from 'react-native-router-flux';

import {
  Platform
} from 'react-native';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key='root' style = {{paddingTop: Platform === 'ios' ? 64 : 54}}>
          <Scene key = 'home' component={Home} title = 'Home'/>
          <Scene key = 'chat' component={Chat} title = 'Chat'/>
        </Scene>
      </Router>
    );
  }
}

export default App;
