import 'react-native-gesture-handler';
import * as React from 'react';
import {Provider} from 'react-redux';

import store from './src/store';
import Routes from './Routes';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
