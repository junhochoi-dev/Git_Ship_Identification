import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'

import Login from './src/accounts/login';
import Signup1 from './src/accounts/signup1';
import Signup2 from './src/accounts/signup2';

import Home from './src/main/home';
import Register from './src/main/register';
import Search from './src/main/search';
import SearchResult from './src/main/searchResult';
import SearchMap from './src/main/searchMap';
import DetailWastedShip from './src/main/detailWastedShip';
import DetailCommonShip from './src/main/detailCommonShip';

import OptionHome from './src/option/optionHome';



const homeStackNav = createStackNavigator(
	{
		Home: {screen: Home, navigationOptions: { headerShown: false }},
		Register: {screen: Register, navigationOptions: { headerShown: false }},
		Search: {screen: Search, navigationOptions: { headerShown: false }},
		SearchResult: {screen: SearchResult, navigationOptions: { headerShown: false }},
		SearchMap: {screen: SearchMap, navigationOptions: { headerShown: false }},
		DetailCommonShip: {screen: DetailCommonShip, navigationOptions: { headerShown: false }},
		DetailWastedShip: {screen: DetailWastedShip, navigationOptions: { headerShown: false }},

	},
	{
		initialRouteName: 'Home'
	}
);

const Drawer = createDrawerNavigator(
	{
		homeStackNav: homeStackNav,
	},
	{
		drawerPosition: 'left',
  		contentComponent: OptionHome,
	}
);

const loginStackNav = createStackNavigator({
	Login: {screen: Login, navigationOptions: { headerShown: false }},
	Signup1: {screen: Signup1, navigationOptions: { headerShown: false }},
	Signup2: {screen: Signup2, navigationOptions: { headerShown: false }},
});


const Root = createSwitchNavigator(
	{
		loginStackNav,
		Drawer,
	}
);

const AppContainer = createAppContainer(Root);

export default class App extends Component {
	render(){
		return <AppContainer></AppContainer>;
	}
}