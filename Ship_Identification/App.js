import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/accounts/login';
import Signup1 from './src/accounts/signup1';
import Signup2 from './src/accounts/signup2';

import Home from './src/main/home';

const loginStackNav = createStackNavigator({
	Login: {screen: Login, navigationOptions: { headerShown: false }},
	Signup1: {screen: Signup1, navigationOptions: { headerShown: false }},
	Signup2: {screen: Signup2, navigationOptions: { headerShown: false }},
});

const homeStackNav = createStackNavigator(
	{
		Home: {screen: Home, navigationOptions: { headerShown: false }},
	},
	{
		initialRouteName: 'Home'
	}
);

const Root = createSwitchNavigator(
	{
		loginStackNav: loginStackNav,
		homeStackNav: homeStackNav,
	},
	{
		initialRouteName: 'loginStackNav'
	}
);

const AppContainer = createAppContainer(Root);

export default class App extends Component {
	render(){
		return <AppContainer></AppContainer>;
	}
}