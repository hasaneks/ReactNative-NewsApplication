import React, { Component } from 'react';

//Third Party Library
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Views
import Login from '../pages/Login';
import News from '../pages/News';
import Language from '../pages/Language';

import { Provider } from 'react-redux'

const Stack = createStackNavigator();
export default class router extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator headerMode='none' initialRouteName='Login'>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Language" component={Language} />
                    <Stack.Screen name="News" component={News} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    };
}