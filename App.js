import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import FirstPage from './src/FirstPage';
import SecondPage from './src/SecondPage';
const App = createStackNavigator(
  {
    FirstPage: {screen: FirstPage},
    SecondPage: {screen: SecondPage},
  },
  {
    initialRouteName: 'FirstPage',
  },
);
export default createAppContainer(App);
