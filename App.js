import React, { Component } from 'react';
//Views
import Login from './src/pages/Login';
import News from './src/pages/News';
import Language from './src/pages/Language';
import NewsDetail from './src/pages/NewsDetail';

//
import reducers from './src/reducers/index';

// //Third Party Library
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Redux
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';


const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none' initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Language" component={Language} />
            <Stack.Screen name="News" component={News} />
            <Stack.Screen name="NewsDetail" component={NewsDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
