/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import PWEWorkShopStore from './src/feature/PWEWorkShopStore';
import TestStore from './redux/TestStore';

function AppRedux() {
  return (
    <Provider store={TestStore}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => AppRedux);
