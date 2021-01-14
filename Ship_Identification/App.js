import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'

import Login from './src/accounts/login';
import Lost from './src/accounts/lost';
import Signup1 from './src/accounts/signup1';
import Signup2 from './src/accounts/signup2';

import Home from './src/main/home';
import Register from './src/main/register';
import RegisterOption from './src/main/registerOption';
import RegisterPlus from './src/main/registerPlus';
import Search from './src/main/search';
import SearchResult from './src/main/searchResult';
import SearchMap from './src/main/searchMap';
import SearchAI from './src/main/searchAI';
import ListCommonShip from './src/main/listCommonShip';
import ListWastedShip from './src/main/listWastedShip';
import DetailWastedShip from './src/main/detailWastedShip';
import DetailCommonShip from './src/main/detailCommonShip';

import OptionHome from './src/option/optionHome';
import ErrorReport from './src/option/errorReport';
import MyAccount from './src/option/myAccount';

const homeStackNav = createStackNavigator(
	{
		Home: {screen: Home, navigationOptions: { headerShown: false }},
		
		Register: {screen: Register, navigationOptions: { headerShown: false }},
		RegisterOption: {screen: RegisterOption, navigationOptions: { headerShown: false }},
		RegisterPlus: {screen: RegisterPlus, navigationOptions: { headerShown: false }},
		Search: {screen: Search, navigationOptions: { headerShown: false }},
		SearchResult: {screen: SearchResult, navigationOptions: { headerShown: false }},
		SearchMap: {screen: SearchMap, navigationOptions: { headerShown: false }},
		SearchAI: {screen: SearchAI, navigationOptions: { headerShown: false }},
		ListCommonShip: {screen: ListCommonShip, navigationOptions: { headerShown: false }},
		ListWastedShip: {screen: ListWastedShip, navigationOptions: { headerShown: false }},
		DetailCommonShip: {screen: DetailCommonShip, navigationOptions: { headerShown: false }},
		DetailWastedShip: {screen: DetailWastedShip, navigationOptions: { headerShown: false }},
	},	{
		initialRouteName: 'Home'
	}
);

const Drawer = createDrawerNavigator(
	{
		homeStackNav: homeStackNav,
		ErrorReport: {screen: ErrorReport, navigationOptions: { headerShown: false }},
		MyAccount: {screen: MyAccount, navigationOptions: { headerShown: false }},
	},
	{
		drawerPosition: 'left',
  		contentComponent: OptionHome,
		defaultNavigationOptions: { drawerLockMode: "locked-closed", }
	}
);

const loginStackNav = createStackNavigator(
	{
		Login: {screen: Login, navigationOptions: { headerShown: false }},
		Lost: {screen: Lost, navigationOptions: { headerShown: false }},
		Signup1: {screen: Signup1, navigationOptions: { headerShown: false }},
		Signup2: {screen: Signup2, navigationOptions: { headerShown: false }},
	},
	{
		initialRouteName: 'Login'
	}
	
);


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