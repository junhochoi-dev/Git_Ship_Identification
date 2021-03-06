import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Intro from './src/intro';
import Login from './src/accounts/login';
import Lost from './src/accounts/lost';
import AccessRights from './src/accounts/accessRights'; 
import Signup1 from './src/accounts/signup1';
import Signup2 from './src/accounts/signup2';

import Home from './src/main/home';
import Register from './src/main/register';
import RegisterPlus from './src/main/registerPlus';
import Search from './src/main/search';
import SearchResult from './src/main/searchResult';
import SearchMap from './src/main/searchMap';
import SearchAI from './src/main/searchAI';
import ListCommonShip from './src/main/listCommonShip';
import ListWastedShip from './src/main/listWastedShip';
import DetailWastedShip from './src/main/detailWastedShip';
import DetailCommonShip from './src/main/detailCommonShip';
import PlusInfoCommonShip from './src/main/plusInfoCommonShip';
import PlusInfoGallery from './src/main/plusInfoGallery';

import OptionHome from './src/option/optionHome';
import ErrorReport from './src/option/errorReport';
import MyAccount from './src/option/myAccount';

import TEST1 from './src/test/test1';
import TEST2 from './src/test/test2';
import TEST3 from './src/test/test3';
import TEST4 from './src/test/test4';
import TEST5 from './src/test/test5';
import TEST6 from './src/test/test6';

const homeStackNav = createStackNavigator(
	{
		Home: {screen: Home, navigationOptions: { headerShown: false }},
		
		Register: {screen: Register, navigationOptions: { headerShown: false }},
		RegisterPlus: {screen: RegisterPlus, navigationOptions: { headerShown: false }},
		Search: {screen: Search, navigationOptions: { headerShown: false }},
		SearchResult: {screen: SearchResult, navigationOptions: { headerShown: false }},
		SearchMap: {screen: SearchMap, navigationOptions: { headerShown: false }},
		SearchAI: {screen: SearchAI, navigationOptions: { headerShown: false }},
		ListCommonShip: {screen: ListCommonShip, navigationOptions: { headerShown: false }},
		ListWastedShip: {screen: ListWastedShip, navigationOptions: { headerShown: false }},
		DetailCommonShip: {screen: DetailCommonShip, navigationOptions: { headerShown: false }},
		DetailWastedShip: {screen: DetailWastedShip, navigationOptions: { headerShown: false }},
		PlusInfoCommonShip: {screen: PlusInfoCommonShip, navigationOptions: { headerShown: false }},
		PlusInfoGallery: {screen: PlusInfoGallery, navigationOptions: { headerShown: false }},
		
		TEST1: {screen: TEST1, navigationOptions: {headerShown: false}},
		TEST2: {screen: TEST2, navigationOptions: {headerShown: false}},
		TEST3: {screen: TEST3, navigationOptions: {headerShown: false}},
		TEST4: {screen: TEST4, navigationOptions: {headerShown: false}},
		TEST5: {screen: TEST5, navigationOptions: {headerShown: false}},
		TEST6: {screen: TEST6, navigationOptions: {headerShown: false}},
		
	},{
		initialRouteName: 'Home'
	}
);

const Drawer = createDrawerNavigator(
	{
		homeStackNav: homeStackNav,
		ErrorReport: {screen: ErrorReport, navigationOptions: { headerShown: false }},
		MyAccount: {screen: MyAccount, navigationOptions: { headerShown: false }},
	},{
		drawerPosition: 'left',
  		contentComponent: OptionHome,
		defaultNavigationOptions: { drawerLockMode: "locked-closed", }
	}
);

const loginStackNav = createStackNavigator(
	{
		Login: {screen: Login, navigationOptions: { headerShown: false }},
		Lost: {screen: Lost, navigationOptions: { headerShown: false }},
		AccessRights: {screen: AccessRights, navigationOptions: { headerShown: false }},
		Signup1: {screen: Signup1, navigationOptions: { headerShown: false }},
		Signup2: {screen: Signup2, navigationOptions: { headerShown: false }},
	},{
		initialRouteName: 'Login'
	}
	
);

const Root = createSwitchNavigator(
	{
		Intro: {screen: Intro, navigationOptions: {headerShown: false}},
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