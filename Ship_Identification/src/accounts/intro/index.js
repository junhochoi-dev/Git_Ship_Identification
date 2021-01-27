import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
export default class Intro extends Component{
	render(){
		return(
			<base.Container>
				<base.Content padder>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}